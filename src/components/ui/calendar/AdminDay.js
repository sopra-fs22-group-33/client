import * as React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { DAY_HEIGHT, SLOT_REL_WIDTH, PIXEL_TO_HOUR } from "./config";
import { AdminSlot } from "./AdminSlot";
import Box from "@mui/material/Box";
import { randomId } from "../../../helpers/validations";
import calendarGlobal from "./calendarGlobal";
import CalendarEventDispatcher from "./calendarEventDispatcher";
import { valueToStrPercent } from "../../../helpers/valueToStrPercent";
import { Slot } from "./Slot";

export class AdminDay extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    // reference to object in parent
    this.day = props.day;
    this.day.slots = this.handleOverlap(this.day.slots);

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
      this.onSlotDeleted
    );
    CalendarEventDispatcher.subscribe(
      "onSlotUpdated",
      this,
      this.onSlotUpdated
    );
  }

  onMouseDown(ev) {
    ev.stopPropagation();
    window.addEventListener("mousemove", this.handleGlobalMouseMove);
    window.addEventListener("mouseup", this.handleGlobalMouseUP);

    let time =
      (ev.clientY - this.ref.getBoundingClientRect().y) / PIXEL_TO_HOUR;
    this.setState({
      isSlotDrawn: true,
      newSlot: { timeFrom: time, timeTo: time },
    });
  }

  handleGlobalMouseMove(ev) {
    if (this.state.isSlotDrawn) {
      this.setState({
        newSlot: {
          timeFrom: this.state.newSlot.timeFrom,
          timeTo: this.state.newSlot.timeTo + ev.movementY / PIXEL_TO_HOUR,
        },
      });
    }
  }

  handleGlobalMouseUP(ev) {
    if (this.state.isSlotDrawn) {
      window.removeEventListener("mouseup", this.handleGlobalMouseUP);
      window.removeEventListener("mousemove", this.handleGlobalMouseMove);

      let from = this.state.newSlot.timeFrom;
      let to = this.state.newSlot.timeTo;

      // if not at least one hour long, then it's a simple click
      if (to - from >= 1) {
        this.appendSlot(from, to);
      }

      this.setState({ isDrawn: false, newSlot: {} });
    }
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
      timeFrom: timeFrom,
      timeTo: timeTo,
      requirement: 1,
      schedules: [],

      id: newId,
    });
    this.day.slots = this.handleOverlap(
      this.state.slots,
      this.state.slots[this.state.slots.length - 1]
    );
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
          onMouseDown={(ev) => this.onMouseDown(ev)}
        >
          <div>
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
            {this.state.isSlotDrawn ? (
              <Slot
                timeFrom={this.state.newSlot.timeFrom}
                timeTo={this.state.newSlot.timeTo}
              />
            ) : null}
          </div>
        </Box>
      </Grid>
    );
  }
}

AdminDay.propTypes = {
    slots: PropTypes.array,
};
