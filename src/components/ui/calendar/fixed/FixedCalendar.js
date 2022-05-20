import * as React from "react";
import PropTypes from "prop-types";
import { Calendar } from "../Calendar";
import { FixedDay } from "./FixedDay";

/**
 * Calendar wrapper that can display data of either team or user depending on type
 */
export class FixedCalendar extends React.Component {
  render() {
    return (
      <Calendar>
        {this.props.days.map((day) => (
          <FixedDay
            key={day.id}
            id={day.id}
            day={day}
            slots={day.slots}
            startingDate={this.props.startingDate}
            type={this.props.type}
          />
        ))}
      </Calendar>
    );
  }
}

FixedCalendar.propTypes = {
  startingDate: PropTypes.string.isRequired,
  days: PropTypes.array.isRequired,

  type: PropTypes.string.isRequired /* type: "team" || "user" */,
};