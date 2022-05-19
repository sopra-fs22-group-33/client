import * as React from "react";
import PropTypes from "prop-types";
import { AdminDay } from "./AdminDay";
import calendarEventDispatcher from "../calendarEventDispatcher";
import calendarGlobal from "../calendarGlobal";
import { Calendar } from "../Calendar";

export class AdminCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.handleGlobalKeyDown = this.handleGlobalKeyDown.bind(this);

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
    window.addEventListener("keydown", this.handleGlobalKeyDown);
  }

  componentWillUnmount() {
    calendarGlobal.setSelectedSlot(null);
    window.removeEventListener("keydown", this.handleGlobalKeyDown);
  }

  handleGlobalKeyDown(ev) {
    if (
      this.state.selectedSlot &&
      (ev.code === "Backspace" || ev.code === "Delete")
    ) {
      calendarEventDispatcher.dispatch("onSlotDeleted");
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

AdminCalendar.propTypes = {
  startingDate: PropTypes.string.isRequired,
  days: PropTypes.array,
};
