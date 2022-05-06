import * as React from "react";
import PropTypes from "prop-types";
import { SLOT_SCALING } from "./config";
import Box from "@mui/material/Box";

export class MemberSlot extends React.Component {
  constructor(props) {
    super(props);
    this.ref = undefined;
    this.id = props.slot.id;

    // reference to object in parent
    this.slot = props.slot;

    this.state = {
      timeFrom: props.timeFrom,
      timeTo: props.timeTo,
      requirement: props.requirement,

      assigned: undefined,
    };

    this.setState({ assigned: this.isAssigned() });
  }

  calcHeight() {
    return SLOT_SCALING * (this.state.timeTo - this.state.timeFrom);
  }

  calcTop() {
    return SLOT_SCALING * this.state.timeFrom;
  }

  onClick(ev) {
    const userId = parseInt(sessionStorage.getItem("id"));
    if (!this.state.assigned) {
      this.slot.schedules.push({ special: userId, user: { id: userId } });
    } else {
      this.slot.schedules = this.slot.schedules.filter(
        (o) => o.special !== userId
      );
    }
    this.setState({ assigned: !this.state.assigned });
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
      <Box
        ref={(el) => {
          if (!el) return;
          this.ref = el;
        }}
        sx={{
          width: 3 / 4,
        }}
        style={{
          position: "absolute",
          height: this.calcHeight(),
          top: this.calcTop(),
          background: this.state.assigned ? "red" : "gray",
          opacity: 0.5,
        }}
        onClick={(ev) => this.onClick(ev)}
      >
        <div>required people:{this.state.requirement}</div>
        <div>
          assigned people:
          {this.slot.schedules.map((schedule) => (
            <div>{schedule.special}</div>
          ))}
        </div>
      </Box>
    );
  }
}

MemberSlot.propTypes = {
  timeFrom: PropTypes.number,
  timeTo: PropTypes.number,
};
