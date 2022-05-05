import * as React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { DAY_HEIGHT, SLOT_REL_WIDTH, SLOT_SCALING } from "./config";
import { AdminSlot } from "./AdminSlot";
import Box from "@mui/material/Box";
import { randomId } from "../../../helpers/validations";
import calendarGlobal from "./calendarGlobal";
import CalendarEventDispatcher from "./calendarEventDispatcher";
import { valueToStrPercent } from "../../../helpers/valueToStrPercent";

export class AdminDay extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    // reference to object in parent
    this.day = props.day;

    this.newSlot = {};
    this.ref = undefined;

    this.state = {
      slots: this.handleOverlap(JSON.parse(JSON.stringify(props.slots))),
    };

    CalendarEventDispatcher.subscribe(
      "onSlotDeleted",
      this,
      this.onSlotDeleted
    );
  }

  onClick(ev) {
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
    const previousLength = this.state.slots.length;
    const filteredSlots = this.state.slots.filter(
      (o) => o.id !== calendarGlobal.getSelectedSlot()
    );
    if (filteredSlots.length === previousLength) {
      return;
    }
    this.day.slots = filteredSlots;
    this.setState({ slots: this.handleOverlap(JSON.parse(JSON.stringify(filteredSlots))) });
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
    this.day.slots = this.state.slots;
    calendarGlobal.setSelectedSlot(newId);
    CalendarEventDispatcher.dispatch("onSlotSelected");
  }

  handleOverlap(slots) {
    const newSlots = [];
    const overlap = [];
    let evaluated, slot;
    let s, count;
    while (slots.length > 0) {
      evaluated = slots.pop();
      overlap.push(evaluated);

      while (slots.length > 0) {
        slot = slots.pop();
        if (
          (evaluated.timeFrom <= slot.timeFrom &&
            evaluated.timeTo > slot.timeFrom) ||
          (evaluated.timeFrom <= slot.timeTo &&
            evaluated.timeTo > slot.timeTo)
        ) {
          overlap.push(slot);
        } else {
          slots.push(slot);
        }
      }
      count = overlap.length;
      s = 0;
      while (overlap.length > 0) {
        slot = overlap.pop();
        slot.width = valueToStrPercent(SLOT_REL_WIDTH / count);
        slot.left = valueToStrPercent((s * SLOT_REL_WIDTH) / count);
        newSlots.push(slot);
        s++;
      }
    }
    return newSlots;
  }

  render() {
    return (
      <Grid item xs={12 / 7}>
        <Box sx={{ width: 1 }} style={{ background: "gray" }}>
          weekday: {this.props.weekday}
        </Box>
        <Box
          ref={(el) => {
            if (!el) return;
            this.ref = el;
          }}
          sx={{
            position: "absolute",
            width: 1 / 10,
            height: DAY_HEIGHT,
            background: "lightgray",
          }}
          onClick={(ev) => this.onClick(ev)}
          onMouseDown={(ev) => this.onMouseDown(ev)}
          onMouseUp={(ev) => this.onMouseUp(ev)}
        >
          {this.state.slots.map((slot) => (
            <AdminSlot
              slot={slot}
              sx={{ width: slot.width, left: slot.left }}
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
