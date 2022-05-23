import * as React from "react";
import { api } from "helpers/api";
import "styles/views/Auth.scss";
import { Player } from "../../models/Player";
import { CHUNK_LENGTH, serialize } from "../ui/game/helpers";
import BaseContainer from "../ui/BaseContainer";
import { GameBoard } from "../ui/game/GameBoard";
import { StatBoard } from "../ui/game/StatBoard";
import { setOffline } from "./GameLobby";

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.isLeaving = false;

    this.state = {
      apples: null,
      isDead: undefined,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.componentCleanup = this.componentCleanup.bind(this);

    this.gameId = sessionStorage.getItem("gameId");
    this.playerId = sessionStorage.getItem("playerId");
    this.player = null;
    this.playerFoes = [];

    this.doStartGame().then(() => this.tick());
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("beforeunload", this.componentCleanup);
  }

  componentCleanup() {
    this.isLeaving = true;
    setOffline(this.gameId, this.player).finally(() => {
      sessionStorage.removeItem("gameId");
      sessionStorage.removeItem("playerId");
    });
  }

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener("beforeunload", this.componentCleanup);
    window.removeEventListener("keydown", this.handleKeyDown);

    // todo: make the player automatically loose the game
  }

  handleKeyDown(ev) {
    if (this.state.isDead) {
      window.removeEventListener("keydown", this.handleKeyDown);
    }
    const [oldX, oldY] = this.player.getDir();
    let [newX, newY] = [0, 0];
    switch (ev.code) {
      case "KeyA":
      case "ArrowLeft":
        newX = -1;
        break;
      case "KeyD":
      case "ArrowRight":
        newX = 1;
        break;
      case "KeyW":
      case "ArrowUp":
        newY = -1;
        break;
      case "KeyS":
      case "ArrowDown":
        newY = 1;
        break;
      default:
        return;
    }
    if (
      (newX !== oldX || newY !== oldY) &&
      (newY !== -1 * oldY ||
        newX !== -1 * oldX) /* prevent snake moving into itself */
    ) {
      this.player.setDir(newX, newY);
    }
  }

  tick() {
    if (this.isLeaving) {
      // workaround to stop recursion on leaving page
      return;
    }
    if (!this.state.isDead) {
      this.player.updatePos();
      this.sendData().then(() =>
        this.fetchData().then(() =>
          setTimeout(() => {
            this.tick();
          }, 100)
        )
      );
    } else {
      this.fetchData().then(() =>
        setTimeout(() => {
          this.tick();
        }, 100)
      );
    }
  }

  async sendData() {
    try {
      const requestBody = JSON.stringify({
        chunks: serialize(this.player.chunks),
      });
      await api.put(`/games/${this.gameId}/${this.player.id}`, requestBody);
    } catch (e) {
      console.log(e);
    }
  }

  async fetchData() {
    try {
      const response = await api.get(`/games/${this.gameId}/${this.player.id}`);

      const game = response.data;

      this.mapPlayers(game.players);

      this.setState({
        apples: game.apples,
        isDead: this.player.status === "dead",
      });
    } catch (e) {
      console.log(e);
    }
  }

  mapPlayers(players) {
    let player, evaluated;
    let p, e;
    for (e = 0; e < players.length; e++) {
      evaluated = players[e];
      if (this.player.id === evaluated.id) {
        this.player.chunks = evaluated.chunks;
        this.player.rank = evaluated.rank;
        this.player.status = evaluated.status;
      } else {
        for (p = 0; p < this.playerFoes.length; p++) {
          player = this.playerFoes[p];
          if (player.id === evaluated.id) {
            player.chunks = evaluated.chunks;
            player.rank = evaluated.rank;
            player.status = evaluated.status;
          }
        }
      }
    }
  }

  doStartGame = async () => {
    const response = await api.get(`/games/${this.gameId}/${this.playerId}`);

    // todo: let choose
    const game = response.data;
    this.gameId = game.id;
    this.boardLength = game.boardLength;

    for (let p = 0; p < game.players.length; p++) {
      const player = new Player(game.players[p]);
      // all players, including user
      if (player.user.id === parseInt(sessionStorage.getItem("id"))) {
        this.player = player;
      } else {
        this.playerFoes.push(player);
      }
    }

    this.setState({
      apples: game.apples,
      isDead: this.player.status === "dead",
    });
  };

  render() {
    let content = <div>waiting for apples</div>;

    if (this.state.apples) {
      content = (
        <div>
          <GameBoard
            length={Math.round(this.boardLength * CHUNK_LENGTH)}
            player={this.player}
            playerFoes={this.playerFoes}
            apples={this.state.apples}
            isDead={this.state.isDead}
          />
          <StatBoard player={this.player} playerFoes={this.playerFoes} />
        </div>
      );
    }
    return (
      <BaseContainer>
        <h1>Game</h1>
        {content}
      </BaseContainer>
    );
  }
}
