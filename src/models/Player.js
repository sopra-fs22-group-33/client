/**
 * Snake/Player model
 */
export class Player {
  constructor(data = {}) {
    this.id = null;
    this.chunks = [];
    // isDead or ate something
    this.status = null;
    this.statusOnline = null;
    // rank is used to display winner
    this.rank = null;
    this.user = null;

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
        x: oldHead.x + this.xDir,
        y: oldHead.y + this.yDir,
      },
    ];
    if (this.status !== "ate") {
      this.chunks.pop();
    }

    this.chunks = newHead.concat(this.chunks);
  }
}
