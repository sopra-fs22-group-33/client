/**
 * Schedule model
 * object that links a User to a Slot
 */
export class Schedule {
  constructor(data = {}) {
    this.id = null;
    // the default value for backend logic
    this.special = -1;
    this.base = null;
    Object.assign(this, data);
  }
}
