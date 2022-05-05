import * as React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { DAY_HEIGHT, SLOT_SCALING } from "./config";
import { AdminSlot } from "./AdminSlot";
import Box from "@mui/material/Box";
import { randomId } from "../../../helpers/validations";
import calendarGlobal from "./calendarGlobal";
import CalendarEventDispatcher from "./calendarEventDispatcher";

export class AdminDay extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    // reference to object in parent
    this.day = props.day;

    this.newSlot = {};
    this.ref = undefined;

    this.state = {
      slots: props.slots,
    };

    CalendarEventDispatcher.subscribe(
      "onSlotDeleted",
      this,
      this.onSlotDeleted
    );
  }

  onClic(ev) {
    ev.stopPropagation();
    if (this.newSlot.timeFrom === undefined) {
      return;
    }
    if (
      Math.round(this.newSlot.timeTo / SLOT_SCALING) -
        Math.round(this.newSlot.timeFrom / SLOT_SCALING) <
      1
    ) {
      return;
    }
    this.appendSlot(this.newSlot.timeFrom, this.newSlot.timeTo);
    this.newSlot = {};
  }

  onMouseDown(ev) {
    ev.stopPropagation();
    this.newSlot.timeFrom = ev.clientY - this.ref.getBoundingClientRect().y;
  }

  onMouseUp(ev) {
    this.newSlot.timeTo = ev.clientY - this.ref.getBoundingClientRect().y;
  }

  onSlotDeleted() {
    console.log("deleting")
    const previousLength = this.state.slots.length;
    const filteredSlots = this.state.slots.filter(
      (o) => o.id !== calendarGlobal.getSelectedSlot()
    );
    if (filteredSlots.length === previousLength) {
      return;
    }
    this.day.slots = filteredSlots;
    this.setState({ slots: filteredSlots });
  }

  appendSlot(timeFrom, timeTo) {
    const newId = randomId();
    this.state.slots.push({
      timeFrom: Math.floor(timeFrom / SLOT_SCALING),
      timeTo: Math.ceil(timeTo / SLOT_SCALING),
      requirement: 1,
      schedules: [],

      id: newId,
    });
    calendarGlobal.setSelectedSlot(newId);
    CalendarEventDispatcher.dispatch("onSlotSelected");
  }

  render() {
    return (
      <Grid item xs={12 / 5}>
        <Box sx={{ width: 1 }} style={{ background: "gray" }}>
          weekday: {this.props.weekday}
        </Box>
        <Box
          ref={(el) => {
            if (!el) return;
            this.ref = el;
          }}
          sx={{ width: 1 / 7 }}
          style={{
            position: "absolute",
            height: DAY_HEIGHT,
            background: "lightgray",
          }}
          onClick={(ev) => this.onClic(ev)}
          onMouseDown={(ev) => this.onMouseDown(ev)}
          onMouseUp={(ev) => this.onMouseUp(ev)}
        >
          {this.state.slots.map((slot) => (
            <AdminSlot
              slot={slot}
              timeFrom={slot.timeFrom}
              timeTo={slot.timeTo}
              schedules={slot.schedules}
              requirement={slot.requirement}
              id={slot.id}
              key={slot.id}
            />
          ))}
        </Box>
      </Grid>
    );
  }
}

AdminDay.propTypes = {
    slots: PropTypes.array,
};
