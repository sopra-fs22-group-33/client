import * as React from "react";
import { api } from "helpers/api";
import { Button } from "components/ui/Button";
import "styles/views/Auth.scss";
import PropTypes from "prop-types";
import { Chunk } from "../ui/game/Chunk";
import { Player } from "../../models/Player";
import { deserialize, serialize } from "../ui/game/helpers";
import BaseContainer from "../ui/BaseContainer";

const GameBoard = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 150,
        left: 400,
        height: 500,
        width: 500,
        background: "black",
      }}
    >
      {props.player.chunks.map((chunk) => (
        <Chunk x={chunk.x} y={chunk.y} background={"green"} />
      ))}
      {props.apples.map((apple) => (
        <Chunk x={apple.x} y={apple.y} background={"red"} />
      ))}
    </div>
  );
};

GameBoard.propTypes = {
  player: PropTypes.objectOf(Player),
  apples: PropTypes.arrayOf(Chunk),
};

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apples: null,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.player = null;
    this.doStartGame();
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(ev) {
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
    this.player.updatePos();
    this.doUpdate();
  }

  async doUpdate() {
    try {
      const requestBody = JSON.stringify({
        chunks: serialize(this.player.chunks),
      });
      await api.put(`/games/${this.gameId}/${this.player.id}`, requestBody);

      const response = await api.get(`/games/${this.gameId}/${this.player.id}`);

      const playerData = response.data.players.filter(
        (player) => player.id === this.player.id
      )[0];
      this.player.chunks = deserialize(playerData.chunks);
      this.player.status = playerData.status;

      this.setState({ apples: deserialize(response.data.apples) });
    } catch (e) {
      console.log(e);
    }
  }

  doStartGame = async () => {
    console.log("starting game");
    const response = await api.get(
      `/users/${localStorage.getItem("id")}/games`
    );

    // todo: let choose
    const game = response.data[0];
    this.gameId = game.id;

    // todo: filter based on stored userId
    this.player = new Player(game.players[0]);
    this.player.chunks = deserialize(this.player.chunks);
    this.setState({ apples: deserialize(game.apples) });
  };

  render() {
    let content = <div>waiting for apples</div>;

    if (this.state.apples) {
      content = <GameBoard player={this.player} apples={this.state.apples} />;
    }
    return (
      <BaseContainer>
        <h1>Game</h1>
        <Button onClick={() => this.doStartGame()}>Restart Game</Button>
        {content}
      </BaseContainer>
    );
  }
}
