import { CHUNK_LENGTH } from "./helpers";

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
    console.log(this.status);
    const oldHead = this.chunks[0];
    const newHead = [
      {
        x: oldHead.x + CHUNK_LENGTH * this.xDir,
        y: oldHead.y + CHUNK_LENGTH * this.yDir,
      },
    ];
    if (this.status !== "ate") {
      this.chunks.pop();
    }

    this.chunks = newHead.concat(this.chunks);
  }
}
