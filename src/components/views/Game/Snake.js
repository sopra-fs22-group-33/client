import * as React from "react";
import PropTypes from "prop-types";

export const Chunk = (props) => {
  return (
    <div
      style={{
        position: "relative",
        top: 0,
        left: 0,
        height: 20,
        width: 20,
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
        this.xPos += this.xDir;
        this.yPos += this.yDir;
    }
}