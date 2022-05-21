import * as React from "react";
import PropTypes from "prop-types";
import { Calendar } from "../Calendar";
import { FixedDay } from "./FixedDay";
import { FillerDay } from "../FillerDay";
import { randomId } from "../../../../helpers/validations";

/**
 * Calendar wrapper that can display data of either team or user depending on type
 */
export class FixedCalendar extends React.Component {
  render() {
    return (
      <Calendar>
        {this.props.days.map((day) => {
          return day.isFiller ? (
            <FillerDay
              key={randomId()}
              weekday={day.weekday}
              startingDate={this.props.startingDate}
            />
          ) : (
            <FixedDay
              key={day.id}
              id={day.id}
              day={day}
              slots={day.slots}
              startingDate={this.props.startingDate}
              type={this.props.type}
            />
          );
        })}
      </Calendar>
    );
  }
}

FixedCalendar.propTypes = {
  startingDate: PropTypes.string.isRequired,
  days: PropTypes.array.isRequired,

  type: PropTypes.string.isRequired /* type: "team" || "user" */,
};