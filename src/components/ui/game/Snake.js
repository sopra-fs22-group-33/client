import {CHUNK_LENGTH} from "./helpers";

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