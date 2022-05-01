import * as React from "react";
import PropTypes from "prop-types";
import { SLOT_SCALING } from "./config";
import Box from "@mui/material/Box";

export class MemberSlot extends React.Component {
  constructor(props) {
    super(props);
    this.ref = undefined;
    this.id = props.slot.id;

    // reference to object in parent
    this.slot = props.slot;

    this.state = {
      timeFrom: props.timeFrom,
      timeTo: props.timeTo,
      requirement: props.requirement,
      schedules: props.schedules,
    };
  }

  calcHeight() {
    return SLOT_SCALING * (this.state.timeTo - this.state.timeFrom);
  }

  calcTop() {
    return SLOT_SCALING * this.state.timeFrom;
  }

  onClick(ev) {
    console.log("click");
  }

  render() {
    return (
      <Box
        ref={(el) => {
          if (!el) return;
          this.ref = el;
        }}
        sx={{
          width: 3 / 4,
        }}
        style={{
          position: "absolute",
          height: this.calcHeight(),
          top: this.calcTop(),
          background: "gray",
          opacity: 0.5,
        }}
        onClick={(ev) => this.onClick(ev)}
      >
        required people:{this.state.requirement}
      </Box>
    );
  }
}

MemberSlot.propTypes = {
    timeFrom: PropTypes.number,
    timeTo: PropTypes.number,
};
