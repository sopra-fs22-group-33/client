import * as React from "react";
import PropTypes from "prop-types";
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

MemberCalendar.propTypes = {
  startingDate: PropTypes.string,
  days: PropTypes.array,
};
