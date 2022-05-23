import * as React from "react";
import PropTypes from "prop-types";
import { SpecialDay } from "./SpecialDay";
import { Calendar, countJokers } from "../Calendar";
import {MAX_JOKERS} from "../config";

export class SpecialCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.handleGlobalClick = this.handleGlobalClick.bind(this);

    this.state = {
      days: props.days,

      selectedSlot: null,
    };
  }

  componentDidMount() {
    window.addEventListener("click", this.handleGlobalClick);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleGlobalClick);
  }

  handleGlobalClick(ev) {
    // click could mean slider drag
    if (countJokers(this.state.days, parseInt(sessionStorage.getItem("id"))) > MAX_JOKERS) {
      alert("too many jokers");
    }
  }

  render() {
    return (
      <Calendar>
        {this.state.days.map((day) => (
          <SpecialDay
            key={day.id}
            id={day.id}
            day={day}
            slots={day.slots}
            date={day.date}
          />
        ))}
      </Calendar>
    );
  }
}

SpecialCalendar.propTypes = {
  startingDate: PropTypes.string.isRequired,
  days: PropTypes.array,
};
