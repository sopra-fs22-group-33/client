import * as React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { DAY_HEIGHT } from "./config";
import { MemberSlot } from "./MemberSlot";
import Box from "@mui/material/Box";
import { Day, handleOverlap } from "./Day";

export class MemberDay extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    // reference to object in parent
    this.day = props.day;
    this.day.slots = handleOverlap(this.day.slots);

    this.ref = undefined;

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
  slots: PropTypes.array,
};
