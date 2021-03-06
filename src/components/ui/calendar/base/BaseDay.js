import * as React from "react";
import PropTypes from "prop-types";
import { BaseSlot } from "./BaseSlot";
import { Day, handleOverlap } from "../Day";

export class BaseDay extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    // reference to object in parent
    this.day = props.day;
    this.day.slots = handleOverlap(this.day.slots, null);

    this.state = {
      slots: this.day.slots,
    };
  }

  render() {
    return (
      <Day date={this.props.date} hideDate={true}>
        {this.state.slots.map((slot) => (
          <BaseSlot
            key={slot.id}
            sx={{ width: slot.width, left: slot.left }}
            id={slot.id}
            slot={slot}
            timeFrom={slot.timeFrom}
            timeTo={slot.timeTo}
            schedules={slot.schedules}
            requirement={slot.requirement}
          />
        ))}
      </Day>
    );
  }
}

BaseDay.propTypes = {
  id: PropTypes.number.isRequired,
  day: PropTypes.object.isRequired,
  slots: PropTypes.array,
  date: PropTypes.object.isRequired,
};
