import * as React from "react";
import PropTypes from "prop-types";

const CHUNK_LENGTH = 20;

export const Chunk = (props) => {
  return (
    <div
      onClick={() => console.log("x:", props.x, "\ny:", props.y)}
      style={{
        position: "absolute",
        top: props.y,
        left: props.x,
        height: CHUNK_LENGTH,
        width: CHUNK_LENGTH,
        background: props.background,
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
    this.status = null;

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
    this.chunks.forEach((chunk) => {
      chunk.x += this.xDir * CHUNK_LENGTH;
      chunk.y += this.yDir * CHUNK_LENGTH;
    });
    if (this.status === "ate") {
      const last = this.chunks[this.chunks.length - 1];
      this.chunks.push({
        x: last.x - this.xDir * CHUNK_LENGTH,
        y: last.y - this.yDir * CHUNK_LENGTH,
      });
    }
  }
}

export function serialize(chunks) {
  const newChunks = [];
  chunks.forEach((chunk) => {
    newChunks.push({
      x: Math.ceil((chunk.x /= CHUNK_LENGTH)),
      y: Math.ceil((chunk.y /= CHUNK_LENGTH)),
    });
  });
  return newChunks;
}

export function deserialize(chunks) {
  const newChunks = [];
  chunks.forEach((chunk) => {
    newChunks.push({
      x: Math.ceil((chunk.x *= CHUNK_LENGTH)),
      y: Math.ceil((chunk.y *= CHUNK_LENGTH)),
    });
  });
  return newChunks;
}
