import { BaseCalendar } from "./BaseCalendar";
import { Calendar } from "../Calendar";
import * as React from "react";
import {PreferenceDay} from "./PreferenceDay";

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
          />
        ))}
      </Calendar>
    );
  }
}