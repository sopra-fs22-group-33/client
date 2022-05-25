import * as React from "react";
import PropTypes from "prop-types";
import { SpecialDay } from "./SpecialDay";
import { Calendar, countJokers } from "../Calendar";
import { MAX_JOKERS } from "../config";
import { FillerDay } from "../FillerDay";
import { randomId } from "../../../../helpers/validations";
import calendarEventDispatcher from "../calendarEventDispatcher";
import { api, handleError } from "../../../../helpers/api";

export class SpecialCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      days: props.days,
      selectedSlot: null,
    };
  }

  componentDidMount() {
    calendarEventDispatcher.createTopic("onJokerUpdated");
    calendarEventDispatcher.subscribe(
      "onJokerUpdated",
      this,
      this.handleJokerUpdated
    );
  }

  componentWillUnmount() {
    calendarEventDispatcher.clear("onJokerUpdated");
  }

  handleJokerUpdated() {
    const diff =
      countJokers(this.props.allDays, parseInt(sessionStorage.getItem("id"))) -
      MAX_JOKERS;

    this.doSaveJokers().then((value) => {
      if (value) {
        alert(
          `Your joker has been saved!\nyou have ${Math.abs(diff)} jokers left`
        );
      }
    });
  }

  async doSaveJokers() {
    const diff =
      countJokers(this.props.allDays, parseInt(sessionStorage.getItem("id"))) -
      MAX_JOKERS;
    if (diff > 0) {
      alert(`too many jokers, please remove ${diff}`);
      return false;
    }
    try {
      // fixed days are never edited from frontend
      const requestBody = JSON.stringify({
        days: this.props.allDays,
        startingDate: this.props.startingDate,
      });
      await api.put(
        `/teams/${sessionStorage.getItem(
          "teamId"
        )}/calendars/${sessionStorage.getItem("id")}`,
        requestBody,
        {
          headers: { token: sessionStorage.getItem("token") },
        }
      );
      return true;
    } catch (error) {
      alert(
        `Something went wrong during saving the calendar: \n${handleError(
          error
        )}`
      );
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
  allDays: PropTypes.array /* for counting jokers and saving */,
};
