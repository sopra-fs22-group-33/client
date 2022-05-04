import * as React from "react";
import { api } from "helpers/api";
import { Button } from "components/ui/Button";
import "styles/views/Auth.scss";
import PropTypes from "prop-types";
import { Chunk } from "../ui/game/Chunk";
import { Snake } from "../ui/game/Snake";
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
    const [oldX, oldY] = this.snake.getDir();
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
    }
    if (
      (newX !== oldX || newY !== oldY) &&
      (newY !== -1 * oldY ||
        newX !== -1 * oldX) /* prevent snake moving into itself */
    ) {
      this.snake.setDir(newX, newY);
    }
    this.snake.updatePos();
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

    const game = response.data[0];

    this.gameId = game.id;
    this.playerId = game.players[0].id;
    this.snake.chunks = deserialize(game.players[0].chunks);
    this.snake.status = game.players[0].status;
    this.setState({ apples: deserialize(game.apples) });
  };

  render() {
    let content = <div>waiting for apples</div>;

    if (this.state.apples) {
      content = <GameBoard snake={this.snake} apples={this.state.apples} />;
    }
    return (
      <BaseContainer>
        <h1>Game</h1>
        <Button onClick={() => this.mockStartGame()}>Restart Game</Button>
        {content}
      </BaseContainer>
    );
  }
}
