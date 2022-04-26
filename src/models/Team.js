/**
 * User model
 */
class Team {
  constructor(data = {}) {
    this.id = null;
    this.name = null;
    this.users = null;

    Object.assign(this, data);
  }
}
export default Team;
