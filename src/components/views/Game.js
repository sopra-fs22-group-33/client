import * as React from "react";
import { api } from "helpers/api";
import "styles/views/Auth.scss";
import PropTypes from "prop-types";
import { Chunk } from "../ui/game/Chunk";
import { Player } from "../../models/Player";
import { CHUNK_LENGTH, deserialize, serialize } from "../ui/game/helpers";
import BaseContainer from "../ui/BaseContainer";

const GameBoard = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 150,
        left: 400,
        height: props.length,
        width: props.length,
        background: "black",
      }}
    >
      {props.isDead ? <DeathDisplay length={props.length} /> : null}
      {props.player.chunks.map((chunk) => (
        <Chunk x={chunk.x} y={chunk.y} background={"green"} />
      ))}
      {props.playerFoes.map((player) =>
        player.chunks.map((chunk) => (
          <Chunk x={chunk.x} y={chunk.y} background={"orange"} />
        ))
      )}
      {props.apples.map((apple) => (
        <Chunk x={apple.x} y={apple.y} background={"red"} />
      ))}
    </div>
  );
};

GameBoard.propTypes = {
  length: PropTypes.number.isRequired,
  player: PropTypes.objectOf(Player).isRequired,
  playerFoes: PropTypes.arrayOf(Player).isRequired,
  apples: PropTypes.arrayOf(Chunk).isRequired,
  isDead: PropTypes.bool.isRequired,
};

const DeathDisplay = (props) => (
  <div
    style={{ position: "relative", top: props.length / 2, background: "white" }}
  >
    YOU DIED
  </div>
);

DeathDisplay.propTypes = {
  length: PropTypes.number.isRequired,
};

const StatBoard = (props) => {
  return (
    <div>
      <PlayerStats player={props.player} />
      <ul>
        {props.playerFoes.map((player) => (
          <PlayerStats player={player} />
        ))}
      </ul>
    </div>
  );
};

StatBoard.propTypes = {
  player: PropTypes.objectOf(Player).isRequired,
  playerFoes: PropTypes.arrayOf(Player).isRequired,
};

const PlayerStats = (props) => {
  return (
    <div>
      <div>player id: {props.player.id}</div>
      {props.player.user ? <div>user id: {props.player.user.id}</div> : null}
      {props.player.user ? <div>email: {props.player.user.email}</div> : null}
      <div>rank: {props.player.rank}</div>
      <div>status: {props.player.status}</div>
    </div>
  );
};

PlayerStats.propTypes = {
  player: PropTypes.objectOf(Player).isRequired,
};

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apples: null,
      isDead: undefined,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.player = null;
    this.playerFoes = [];
    this.doStartGame().then(() => this.tick());
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    sessionStorage.removeItem("gameId");
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(ev) {
    if (this.state.isDead) {
      window.removeEventListener("keydown", this.handleKeyDown);
    }
    // todo: optimise for held key
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
        apples: deserialize(game.apples),
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
        this.player.chunks = deserialize(evaluated.chunks);
        this.player.rank = evaluated.rank;
        this.player.status = evaluated.status;
      } else {
        for (p = 0; p < this.playerFoes.length; p++) {
          player = this.playerFoes[p];
          if (player.id === evaluated.id) {
            player.chunks = deserialize(evaluated.chunks);
            player.rank = evaluated.rank;
            player.status = evaluated.status;
          }
        }
      }
    }
  }

  doStartGame = async () => {
    const response = await api.get(
      `/users/${sessionStorage.getItem("id")}/games`
    );

    // todo: let choose
    const game = response.data[0];
    this.gameId = game.id;
    this.boardLength = game.boardLength;

    for (let p = 0; p < game.players.length; p++) {
      const player = new Player(game.players[p]);
      player.chunks = deserialize(player.chunks);
      // all players, including user
      if (player.user.id.toString() === sessionStorage.getItem("id")) {
        this.player = player;
      } else {
        this.playerFoes.push(player);
      }
    }

    this.setState({
      apples: deserialize(game.apples),
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
