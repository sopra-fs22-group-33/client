import * as React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { DAY_HEIGHT, DAY_SPACING } from "./config";
import { MemberDay } from "./MemberDay";
import { Calendar } from "./Calendar";

export class MemberCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      days: props.days,
    };
  }

  render() {
    return (
      <Calendar>
        {this.state.days.map((day) => (
          <MemberDay
            day={day}
            weekday={day.weekday}
            slots={day.slots}
            id={day.id}
            key={day.id}
          />
        ))}
      </Calendar>
    );
  }
}

MemberCalendar.propTypes = {
  startingDate: PropTypes.string,
  days: PropTypes.array,
};
