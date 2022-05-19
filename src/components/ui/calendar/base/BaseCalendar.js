import * as React from "react";
import PropTypes from "prop-types";
import { BaseDay } from "./BaseDay";
import { Calendar } from "../Calendar";

export class BaseCalendar extends React.Component {
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
          <BaseDay
            key={day.id}
            id={day.id}
            day={day}
            weekday={day.weekday}
            slots={day.slots}
            startingDate={this.props.startingDate}
          />
        ))}
      </Calendar>
    );
  }
}

BaseCalendar.propTypes = {
  startingDate: PropTypes.string.isRequired,
  days: PropTypes.array,
};
