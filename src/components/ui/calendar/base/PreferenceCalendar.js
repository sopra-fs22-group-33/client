import { BaseCalendar } from "./BaseCalendar";
import { Calendar } from "../Calendar";
import * as React from "react";
import {PreferenceDay} from "./PreferenceDay";
import PropTypes from "prop-types";

export class PreferenceCalendar extends BaseCalendar {
  render() {
    return (
      <Calendar>
        {this.props.days.map((day) => (
          <PreferenceDay
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

PreferenceCalendar.propTypes = {
  startingDate: PropTypes.string.isRequired,
  days: PropTypes.array,
};