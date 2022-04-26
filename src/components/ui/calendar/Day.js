import * as React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { DAY_HEIGHT, SLOT_SCALING } from "./config";
import { Slot } from "./Slot";
import Box from "@mui/material/Box";
import { randomId } from "../../../helpers/validations";
import CalendarGlobal from "./CalendarGlobal";
import CalendarEventDispatcher from "./CalendarEventDispatcher";

export class Day extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;

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
    if (this.newSlot.from === undefined) {
      return;
    }
    if (
      Math.round(this.newSlot.to / SLOT_SCALING) -
        Math.round(this.newSlot.from / SLOT_SCALING) <
      1
    ) {
      return;
    }
    this.appendSlot(this.newSlot.from, this.newSlot.to);
    this.newSlot = {};
  }

  onMouseDown(ev) {
    ev.stopPropagation();
    this.newSlot.from = ev.clientY - this.ref.getBoundingClientRect().y;
  }

  onMouseUp(ev) {
    ev.stopPropagation();
    this.newSlot.to = ev.clientY - this.ref.getBoundingClientRect().y;
  }

  onSlotDeleted() {
    const previousLength = this.state.slots.length;
    const filteredSlots = this.state.slots.filter(
      (o) => o.id !== CalendarGlobal.getSelectedSlot()
    );
    if (filteredSlots.length === previousLength) {
      return;
    }
    this.setState({ slots: filteredSlots });
  }

  appendSlot(from, to) {
    const newId = randomId();
    this.state.slots.push({
      from: Math.floor(from / SLOT_SCALING),
      to: Math.ceil(to / SLOT_SCALING),
      id: newId,
    });
    CalendarGlobal.setSelectedSlot(newId);
    CalendarEventDispatcher.dispatch("onSlotSelected");
  }

  render() {
    return (
      <Grid item xs={12 / 7}>
        <Box sx={{ width: 1 }} style={{ background: "lightgray" }}>
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
            background: "white",
          }}
          onClick={(ev) => this.onClic(ev)}
          onMouseDown={(ev) => this.onMouseDown(ev)}
          onMouseUp={(ev) => this.onMouseUp(ev)}
        >
          {this.state.slots.map((slot) => (
            <Slot from={slot.from} to={slot.to} id={slot.id} key={slot.id} />
          ))}
        </Box>
      </Grid>
    );
  }
}

Day.propTypes = {
  slots: PropTypes.array,
};