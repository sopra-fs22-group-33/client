import * as React from "react";
import PropTypes from "prop-types";

const CHUNK_LENGTH = 20;

export const Chunk = (props) => {
  return (
    <div
      style={{
        position: "relative",
        top: props.y,
        left: props.x,
        height: CHUNK_LENGTH,
        width: CHUNK_LENGTH,
        background: "green",
      }}
    />
  );
};

Chunk.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};

export class Snake {
    constructor(chunks) {
        this.chunks = chunks;

        this.xDir = undefined;
        this.yDir = undefined;

        this.xPos = undefined;
        this.yPos = undefined;
    }

    setDir(xDir, yDir) {
        this.xDir = xDir;
        this.yDir = yDir;
    }

    getDir() {
        return [this.xDir, this.yDir];
    }

    updatePos() {
        this.chunks.forEach((chunk) => {chunk.x += this.xDir * CHUNK_LENGTH; chunk.y += this.yDir*CHUNK_LENGTH});
    }
}