import * as React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { DAY_HEIGHT, SLOT_SCALING } from "./config";
import { Slot } from "./Slot";
import Box from "@mui/material/Box";

export class Day extends React.Component {
  constructor(props) {
    super(props);

    this.newSlot = {};

    this.isSlotDrawn = false;
    this.isSlotEdited = false;

    this.ref = undefined;

    this.state = {
      slots: props.slots,
    };
  }

  onClic(ev) {
    // todo: validate creation if necessary
    console.log("slot creation");
  }

  onMouseDown(ev) {
    if (this.isSlotDrawn || this.isSlotEdited) {
      console.log(this.isSlotDrawn);
      return;
    }

    // todo: check that no slot in space exists
    this.isSlotDrawn = true;
    this.newSlot.from = ev.clientY - this.ref.getBoundingClientRect().y;
  }

  onMouseUp(ev) {
    if (!this.isSlotDrawn) {
      console.log(this.isSlotDrawn);
      return;
    }

    this.newSlot.to = ev.clientY - this.ref.getBoundingClientRect().y;

    if (
      Math.round(this.newSlot.to / SLOT_SCALING) -
        Math.round(this.newSlot.from / SLOT_SCALING) <
      1
    ) {
      console.log("Slot too short", this.newSlot.to - this.newSlot.from);
      this.isSlotDrawn = false;
      return;
    }

    this.isSlotDrawn = false;
    this.appendSlot(this.newSlot.from, this.newSlot.to);
  }

  appendSlot(from, to) {
    this.state.slots.push({
      from: Math.round(from / SLOT_SCALING),
      to: Math.round(to / SLOT_SCALING),
    });
    this.setState({ slots: this.state.slots });
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
            <Slot from={slot.from} to={slot.to} />
          ))}
        </Box>
      </Grid>
    );
  }
}

Day.propTypes = {
  slots: PropTypes.array,
};
