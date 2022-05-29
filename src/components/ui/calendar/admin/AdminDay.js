import * as React from "react";
import PropTypes from "prop-types";
import { HOUR_HEIGHT } from "../config";
import { AdminSlot } from "./AdminSlot";
import { randomId } from "../../../../helpers/validations";
import calendarGlobal from "../calendarGlobal";
import CalendarEventDispatcher from "../calendarEventDispatcher";
import { Slot } from "../Slot";
import { Day, handleOverlap } from "../Day";

export class AdminDay extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    // reference to object in parent
    this.day = props.day;
    this.day.slots = handleOverlap(this.day.slots, null);

    this.ref = undefined;

    this.handleGlobalMouseUP = this.handleGlobalMouseUP.bind(this);
    this.handleGlobalMouseMove = this.handleGlobalMouseMove.bind(this);

    this.state = {
      slots: this.day.slots,

      isSlotDrawn: false,
      newSlot: {},
    };

    CalendarEventDispatcher.subscribe(
      "onSlotDeleted",
      this,
      this.handleSlotDeleted
    );
    CalendarEventDispatcher.subscribe(
      "onSlotUpdated",
      this,
      this.handleSlotUpdated
    );
  }

  handleMouseDown(ev) {
    ev.stopPropagation();
    window.addEventListener("mousemove", this.handleGlobalMouseMove);
    window.addEventListener("mouseup", this.handleGlobalMouseUP);

    let time = (ev.clientY - this.ref.getBoundingClientRect().y) / HOUR_HEIGHT;
    this.setState({
      isSlotDrawn: true,
      newSlot: { timeFrom: time, timeTo: time + 1 },
    });
  }

  handleGlobalMouseMove(ev) {
    if (this.state.isSlotDrawn) {
      const to = this.state.newSlot.timeTo + ev.movementY / HOUR_HEIGHT;
      if (to <= 24 && to > this.state.newSlot.timeFrom) {
        this.setState({
          newSlot: {
            timeFrom: this.state.newSlot.timeFrom,
            timeTo: to,
          },
        });
      }
    }
  }

  handleGlobalMouseUP() {
    if (this.state.isSlotDrawn) {
      window.removeEventListener("mouseup", this.handleGlobalMouseUP);
      window.removeEventListener("mousemove", this.handleGlobalMouseMove);

      let from = Math.round(this.state.newSlot.timeFrom);
      let to = Math.round(this.state.newSlot.timeTo);

      // if not at least one hour long, then it's a simple click
      if (to - from >= 1) {
        this.appendSlot(from, to);
      }

      this.setState({ isSlotDrawn: false, newSlot: {} });
    }
  }

  handleSlotDeleted() {
    const previousLength = this.state.slots.length;
    const filteredSlots = this.state.slots.filter(
      (o) => o.id !== calendarGlobal.getSelectedSlot()
    );
    if (filteredSlots.length === previousLength) {
      return;
    }
    this.day.slots = handleOverlap(filteredSlots, null);
    this.setState({ slots: this.day.slots });
  }

  handleSlotUpdated() {
    const updatedId = calendarGlobal.getSelectedSlot();
    for (let slot of this.state.slots) {
      if (slot.id === updatedId) {
        this.day.slots = handleOverlap(this.state.slots, slot);
        this.setState({ slots: this.day.slots });
      }
    }
  }

  appendSlot(timeFrom, timeTo) {
    const newId = randomId();
    this.state.slots.push({
      timeFrom: timeFrom,
      timeTo: timeTo,
      requirement: 1,
      schedules: [],

      id: newId,
    });
    this.day.slots = handleOverlap(
      this.state.slots,
      this.state.slots[this.state.slots.length - 1]
    );
    this.setState({ slots: this.day.slots });
  }

  render() {
    return (
      <Day
        onMouseDown={(ev) => this.handleMouseDown(ev)}
        date={this.props.date}
        hideDate={true}
      >
        <div
          ref={(el) => {
            if (!el) return;
            this.ref = el;
          }}
        >
          {this.state.slots.map((slot) => (
            <AdminSlot
              key={slot.id}
              sx={{ width: slot.width, left: slot.left }}
              id={slot.id}
              slot={slot}
              timeFrom={slot.timeFrom}
              timeTo={slot.timeTo}
              requirement={slot.requirement}
            />
          ))}
          {this.state.isSlotDrawn ? (
            <Slot
              timeFrom={this.state.newSlot.timeFrom}
              timeTo={this.state.newSlot.timeTo}
            />
          ) : null}
        </div>
      </Day>
    );
  }
}

AdminDay.propTypes = {
  id: PropTypes.number.isRequired,
  day: PropTypes.object.isRequired,
  slots: PropTypes.array,
  date: PropTypes.object.isRequired,
};
