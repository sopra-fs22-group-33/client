import * as React from "react";
import PropTypes from "prop-types";
import { SpecialDay } from "./SpecialDay";
import { Calendar } from "../Calendar";

export class SpecialCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      days: props.days,

      selectedSlot: null,
    };
  }

  render() {
    return (
      <Calendar>
        {this.state.days.map((day) => (
          <SpecialDay
            key={day.id}
            id={day.id}
            day={day}
            weekday={day.weekday}
            slots={day.slots}
          />
        ))}
      </Calendar>
    );
  }
}

SpecialCalendar.propTypes = {
  startingDate: PropTypes.string,
  days: PropTypes.array,
};
