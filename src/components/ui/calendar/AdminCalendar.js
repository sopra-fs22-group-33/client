import * as React from "react";
import PropTypes from "prop-types";
import { AdminDay } from "./AdminDay";
import calendarEventDispatcher from "./calendarEventDispatcher";
import calendarGlobal from "./calendarGlobal";
import { Calendar } from "./Calendar";

export class AdminCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      days: props.days,
      selectedSlot: null,
    };

    calendarEventDispatcher.createTopic("onSlotSelected");
    calendarEventDispatcher.createTopic("onSlotDeleted");
    calendarEventDispatcher.createTopic("onSlotUpdated");

    calendarEventDispatcher.subscribe(
      "onSlotSelected",
      this,
      this.handleSlotSelected
    );
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(ev) {
    if (this.state.selectedSlot) {
      // deselect slot
      if (ev.code === "Escape") {
        calendarGlobal.setSelectedSlot(null);
        this.setState({ selectedSlot: null });
      }
      // delete slot
      else if (ev.code === "Backspace" || ev.code === "Delete") {
        calendarEventDispatcher.dispatch("onSlotDeleted");
      }
    }
  }

  handleSlotSelected() {
    // workaround to rerender entire calendar
    this.setState({ selectedSlot: calendarGlobal.getSelectedSlot() });
  }

  render() {
    return (
      <Calendar>
        {this.state.days.map((day) => (
          <AdminDay
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

AdminCalendar.propTypes = {
  startingDate: PropTypes.string,
  days: PropTypes.array,
};
