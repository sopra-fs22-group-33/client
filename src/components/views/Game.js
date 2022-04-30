import * as React from "react";
import { api } from "helpers/api";
import { Button } from "components/ui/Button";
import "styles/views/Auth.scss";
import PropTypes from "prop-types";
import { Chunk } from "../ui/game/Chunk";
import { Snake } from "../ui/game/Snake";
import { deserialize, serialize } from "../ui/game/helpers";

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
      {props.snake.chunks.map((chunk) => (
        <Chunk x={chunk.x} y={chunk.y} background={"green"} />
      ))}
      {props.apples.map((apple) => (
        <Chunk x={apple.x} y={apple.y} background={"red"} />
      ))}
    </div>
  );
};

GameBoard.propTypes = {
  snake: PropTypes.objectOf(Snake),
  apples: PropTypes.arrayOf(Chunk),
};

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apples: null,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.snake = new Snake([{ x: 100, y: 100 }]);
    this.mockStartGame();
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(ev) {
    switch (ev.code) {
      case "KeyA":
      case "ArrowLeft":
        this.snake.setDir(-1, 0);
        this.snake.updatePos();
        break;
      case "KeyD":
      case "ArrowRight":
        this.snake.setDir(1, 0);
        this.snake.updatePos();
        break;
      case "KeyW":
      case "ArrowUp":
        this.snake.setDir(0, -1);
        this.snake.updatePos();
        break;
      case "KeyS":
      case "ArrowDown":
        this.snake.setDir(0, 1);
        this.snake.updatePos();
        break;
    }
    this.doUpdate();
  }

  async doUpdate() {
    try {
      const requestBody = JSON.stringify({
        chunks: serialize(this.snake.chunks),
      });
      await api.put(`/games/${this.gameId}/${this.playerId}`, requestBody);
      const response = await api.get(`/games/${this.gameId}/${this.playerId}`);

      this.snake.chunks = deserialize(response.data.players[0].chunks);
      this.snake.status = response.data.players[0].status;
      this.setState({ apples: deserialize(response.data.apples) });
    } catch (e) {
      console.log(e);
    }
  }

  mockStartGame = async () => {
    const response = await api.get("/games");
    if (response.data.length > 0) {
      this.gameId = response.data.id;
      this.playerId = response.data.players[0].id;
      this.snake.chunks = deserialize(response.data.players[0].chunks);
      this.snake.status = response.data.players[0].status;
      this.setState({ apples: deserialize(response.data.apples) });
    } else {
      console.log("no game");
    }
  };

  render() {
    let content = <div>waiting for apples</div>;

    if (this.state.apples) {
      content = <GameBoard snake={this.snake} apples={this.state.apples} />;
    }
    return (
      <div>
        <Button onClick={this.mockStartGame}>Restart Game</Button>
        {content}
      </div>
    );
  }
}
