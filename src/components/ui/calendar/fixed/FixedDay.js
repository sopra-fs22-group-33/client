import * as React from "react";
import PropTypes from "prop-types";
import { Day, handleOverlap } from "../Day";
import { FixedSlot } from "./FixedSlot";

export class FixedDay extends React.Component {
  constructor(props) {
    super(props);
    this.props.day.slots = handleOverlap(this.props.day.slots, null);
  }

  render() {
    return (
      <Day
        weekday={this.props.day.weekday}
        startingDate={this.props.startingDate}
      >
        {this.props.day.slots.map((slot) => (
          <FixedSlot
            key={slot.id}
            id={slot.id}
            slot={slot}
            timeFrom={slot.timeFrom}
            timeTo={slot.timeTo}
            type={this.props.type}
          />
        ))}
      </Day>
    );
  }
}

FixedDay.propTypes = {
  id: PropTypes.number.isRequired,
  day: PropTypes.object.isRequired,
  slots: PropTypes.array.isRequired,
  startingDate: PropTypes.string.isRequired,

  type: PropTypes.string.isRequired /* type: "team" || "user" */,
};