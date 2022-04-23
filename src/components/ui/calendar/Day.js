import * as React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { DAY_HEIGHT, Item, SLOT_SCALING } from "./config";
import { Slot } from "./Slot";
import Box from "@mui/material/Box";

export class Day extends React.Component {
  constructor(props) {
    super(props);

    this.temp = {};

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
    this.temp.from = ev.clientY - this.ref.getBoundingClientRect().y;
  }

  onMouseUp(ev) {
    this.appendSlot(
      this.temp.from,
      ev.clientY - this.ref.getBoundingClientRect().y
    );
  }

  appendSlot(from, to) {
    this.state.slots.push({
      from: Math.floor(from / SLOT_SCALING),
      to: Math.floor(to / SLOT_SCALING),
    });
    this.setState({ slots: this.state.slots });
  }

  render() {
    return (
      <Grid item xs={12 / 7}>
        <Box sx={{ width: 1}} style={{ background: "lightgray" }}>
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
