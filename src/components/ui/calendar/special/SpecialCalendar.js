import * as React from "react";
import PropTypes from "prop-types";
import { SpecialDay } from "./SpecialDay";
import { Calendar, countJokers } from "../Calendar";
import { MAX_JOKERS } from "../config";
import { FillerDay } from "../FillerDay";
import { randomId } from "../../../../helpers/validations";
import calendarEventDispatcher from "../calendarEventDispatcher";

export class SpecialCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      days: props.days,
      selectedSlot: null,
    };

    calendarEventDispatcher.createTopic("onJokerUpdated");
    calendarEventDispatcher.subscribe(
      "onJokerUpdated",
      this,
      this.handleJokerUpdated
    );
  }

  handleJokerUpdated() {
    const diff = countJokers(
      this.props.allDays,
      parseInt(sessionStorage.getItem("id"))

    ) - MAX_JOKERS;
    if (diff > 0) {
      console.log(`too many jokers, please remove ${diff}`);
    } else {
      console.log(`you have ${Math.abs(diff)} jokers left`)
    }
  }

  render() {
    return (
      <Calendar>
        {this.props.days.map((day) => {
          return day.isFiller ? (
            <FillerDay key={randomId()} date={day.date} />
          ) : (
            <SpecialDay
              key={day.id}
              id={day.id}
              day={day}
              slots={day.slots}
              date={day.date}
            />
          );
        })}
      </Calendar>
    );
  }
}

SpecialCalendar.propTypes = {
  startingDate: PropTypes.string.isRequired,
  days: PropTypes.array,
  allDays: PropTypes.array, /* for counting jokers */
};
