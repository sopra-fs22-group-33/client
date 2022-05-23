import { BaseDay } from "./BaseDay";
import { Day } from "../Day";
import * as React from "react";
import { PreferenceSlot } from "./PreferenceSlot";
import PropTypes from "prop-types";

export class PreferenceDay extends BaseDay {
  render() {
    return (
      <Day date={this.props.date} hideDate={true}>
        {this.props.slots.map((slot) => (
          <PreferenceSlot
            key={slot.id}
            sx={{ width: slot.width, left: slot.left }}
            id={slot.id}
            slot={slot}
            timeFrom={slot.timeFrom}
            timeTo={slot.timeTo}
            base={slot.base}
          />
        ))}
      </Day>
    );
  }
}

PreferenceDay.propTypes = {
  id: PropTypes.number.isRequired,
  day: PropTypes.object.isRequired,
  slots: PropTypes.array,
  date: PropTypes.object.isRequired,
};