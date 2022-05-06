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
    this.day.slots = this.handleOverlap(this.day.slots);

    this.newSlot = {};
    this.ref = undefined;

    this.state = {
      slots: this.day.slots,
    };

    CalendarEventDispatcher.subscribe(
      "onSlotDeleted",
      this,
      this.onSlotDeleted
    );
    CalendarEventDispatcher.subscribe(
      "onSlotUpdated",
      this,
      this.onSlotUpdated
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
    this.day.slots = this.handleOverlap(filteredSlots);
    this.setState({ slots: this.day.slots });
  }

  onSlotUpdated() {
    const updatedId = calendarGlobal.getSelectedSlot();
    for (let slot of this.state.slots) {
      if (slot.id === updatedId) {
        this.day.slots = this.handleOverlap(this.state.slots, slot);
        this.setState({ slots: this.day.slots });
      }
    }
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
    this.day.slots = this.handleOverlap(this.state.slots, this.state.slots[this.state.slots.length - 1]);
    this.setState({ slots: this.day.slots });
    calendarGlobal.setSelectedSlot(newId);
    CalendarEventDispatcher.dispatch("onSlotSelected");
  }

  handleOverlap(slots, newSlot) {
    // reset
    slots.forEach((slot) => {
      slot.overlapCount = null;
      slot.left = null;
      slot.width = null;
    });

    // calculate overlaps
    let evaluated, slot;
    for (evaluated of slots) {
      if (!evaluated.overlapCount) {
        evaluated.overlapCount = 0;
      }
      for (slot of slots) {
        if (evaluated === slot) {
          continue;
        }
        if (!slot.overlapCount) {
          slot.overlapCount = 0;
        }
        // check only one subcase to avoid duplication
        if (
          (evaluated.timeFrom >= slot.timeFrom &&
            evaluated.timeTo <= slot.timeFrom) ||
          (evaluated.timeFrom <= slot.timeFrom &&
            evaluated.timeTo > slot.timeFrom)
        ) {
          evaluated.overlapCount++;
          slot.overlapCount++;

          evaluated.overlapCount = Math.min(
            evaluated.overlapCount,
            slot.overlapCount
          );
          slot.overlapCount = evaluated.overlapCount;
        }
      }
    }

    // inverted sorting to put first shift left
    function compareFunc(b, a) {
      if (a.timeFrom < b.timeFrom) {
        return 1;
      }
      if (a.timeFrom > b.timeFrom) {
        return -1;
      }
      return 0;
    }

    slots = slots.sort(compareFunc);

    // set properties
    let isPushedRight = false;
    evaluated = slots[0];
    for (slot of slots) {
      if (slot.overlapCount < 1) {
        continue;
      }
      if (slot.overlapCount > 1) {
        alert("At most two overlapping schedules are allowed");
        if (newSlot) {
          slots = slots.filter((o) => o !== newSlot);
        } else {
          slots = slots.filter((o) => o !== slot);
        }
        return this.handleOverlap(slots);
      }
      slot.width = valueToStrPercent(SLOT_REL_WIDTH / 2);
      if (isPushedRight) {
        slot.left = valueToStrPercent(SLOT_REL_WIDTH / 2);
      }
      //alternate
      if (evaluated.timeTo <= slot.timeTo) {
        isPushedRight = !isPushedRight;
        evaluated = slot;
      }
    }

    return slots;
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
