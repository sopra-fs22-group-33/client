import * as React from "react";
import PropTypes from "prop-types";
import { MemberSlot } from "./MemberSlot";
import { Day, handleOverlap } from "./Day";

export class MemberDay extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    // reference to object in parent
    this.day = props.day;
    this.day.slots = handleOverlap(this.day.slots);

    this.state = {
      slots: this.day.slots,
    };
  }

  render() {
    return (
      <Day>
        {this.state.slots.map((slot) => (
          <MemberSlot
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

MemberDay.propTypes = {
  id: PropTypes.number.isRequired,
  day: PropTypes.object.isRequired,
  slots: PropTypes.array,
};
