import * as React from "react";
import { api, handleError } from "helpers/api";
import { Button } from "components/ui/Button";
import "styles/views/Auth.scss";
import { Chunk, Snake } from "./Snake";
import PropTypes from "prop-types";

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
        <Chunk x={chunk.x} y={chunk.y} />
      ))}
    </div>
  );
};

GameBoard.propTypes = {
  snake: PropTypes.objectOf(Snake),
};

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.snake = new Snake([{ x: 100, y: 100 }]);

    this.state = {
      currentGame: null,
    };
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
    this.setState({ kek: "kek" });
  }

  mockStartGame = async () => {
    const requestBody = JSON.stringify({
      players: [{ chunks: [{ x: 0, y: 0 }] }],
    });
    const mockGame = (await api.post("/games", requestBody)).data;
    console.log("game created");
  };

  getUpdatedGame = async () => {
    const currentGame = (await api.get("/games")).data;
    console.log("yes");
  };

  // timer works (8fps), api request doesn't, http 500
  // setInterval(getUpdatedGame, 125);

  makeMove = () => {
    // PUT request
  };

  render() {
    return (
      <div>
        <Button onClick={this.mockStartGame}>Start Game</Button>
        <GameBoard snake={this.snake} />
      </div>
    );
  }
}
