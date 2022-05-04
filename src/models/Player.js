import { CHUNK_LENGTH } from "../components/ui/game/helpers";

/**
 * Snake/Player model
 */
export class Player {
  constructor(data = {}) {
    this.id = null;
    this.chunks = null;
    this.status = null;
    this.rank = null;

    this.xDir = undefined;
    this.yDir = undefined;

    this.xPos = undefined;
    this.yPos = undefined;

    Object.assign(this, data);
  }

  setDir(xDir, yDir) {
    this.xDir = xDir;
    this.yDir = yDir;
  }

  getDir() {
    return [this.xDir, this.yDir];
  }

  updatePos() {
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
