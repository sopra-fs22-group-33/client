import * as React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { DAY_HEIGHT, SLOT_SCALING } from "./config";
import { Slot } from "./Slot";
import Box from "@mui/material/Box";
import {randomId} from "../../../helpers/validations";

export class Day extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;

    this.newSlot = {};
    this.ref = undefined;

    this.state = {
      slots: props.slots,
    };
  }

  onClic(ev) {
    //check whether mouse down was on existing slot
    for (const slot of this.state.slots) {
      if (
        Math.round(this.newSlot.from / SLOT_SCALING) >= slot.from &&
        Math.round(this.newSlot.from / SLOT_SCALING) <= slot.to
      ) {
        return;
      }
    }

    if (
      Math.round(this.newSlot.to / SLOT_SCALING) -
        Math.round(this.newSlot.from / SLOT_SCALING) <
      1
    ) {
      this.isSlotDrawn = false;
      return;
    }

    this.appendSlot(this.newSlot.from, this.newSlot.to);
  }

  onMouseDown(ev) {
    this.newSlot.from = ev.clientY - this.ref.getBoundingClientRect().y;
  }

  onMouseUp(ev) {
    this.newSlot.to = ev.clientY - this.ref.getBoundingClientRect().y;
  }

  appendSlot(from, to) {
    this.state.slots.push({
      from: Math.round(from / SLOT_SCALING),
      to: Math.round(to / SLOT_SCALING),
      id: randomId(),
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
