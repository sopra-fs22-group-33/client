import * as React from "react";
import PropTypes from "prop-types";
import { MemberDay } from "./MemberDay";
import { Calendar } from "./Calendar";
import calendarEventDispatcher from "./calendarEventDispatcher";
import calendarGlobal from "./calendarGlobal";

export class MemberCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.handleGlobalKeyDown = this.handleGlobalKeyDown.bind(this);

    this.state = {
      days: props.days,

      selectedSlot: null,
    };

    calendarEventDispatcher.createTopic("onSlotSelected");

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
    if (this.state.selectedSlot && ev.code === "Escape") {
      calendarGlobal.setSelectedSlot(null);
      this.setState({ selectedSlot: null });
    }
  }

  handleSlotSelected() {
    this.setState({ selectedSlot: calendarGlobal.getSelectedSlot() });
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
