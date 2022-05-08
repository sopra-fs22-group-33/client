import * as React from "react";
import PropTypes from "prop-types";
import { Slot } from "./Slot";

export class MemberSlot extends React.Component {
  constructor(props) {
    super(props);
    this.ref = undefined;
    this.id = props.id;

    // reference to object in parent
    this.slot = props.slot;

    this.state = {
      assigned: this.isAssigned(),
    };
  }

  handleClick(ev) {
    const userId = parseInt(sessionStorage.getItem("id"));
    if (!this.state.assigned) {
      this.slot.schedules.push({ special: userId, user: { id: userId } });
    } else {
      this.slot.schedules = this.slot.schedules.filter(
        (o) => o.special !== userId
      );
    }
    this.setState({ assigned: !this.state.assigned });
    console.log(this.slot.schedules);
  }

  isAssigned() {
    for (const schedule of this.slot.schedules) {
      if (schedule.special === parseInt(sessionStorage.getItem("id"))) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <Slot
        sx={this.props.sx}
        style={{ background: this.state.assigned ? "red" : null }}
        timeFrom={this.props.timeFrom}
        timeTo={this.props.timeTo}
        onClick={(ev) => this.handleClick(ev)}
      >
        <div>req: {this.props.requirement}</div>
      </Slot>
    );
  }
}

MemberSlot.propTypes = {
  id: PropTypes.number.isRequired,
  slot: PropTypes.object.isRequired,
  timeFrom: PropTypes.number.isRequired,
  timeTo: PropTypes.number.isRequired,
  requirement: PropTypes.number,

  sx: PropTypes.object,
};
