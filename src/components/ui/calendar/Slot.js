import * as React from "react";
import PropTypes from "prop-types";
import { Item, SLOT_SCALING } from "./config";

export class Slot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: props.from,
      to: props.to,
    };
  }

  calcHeight() {
    return SLOT_SCALING * (this.state.to - this.state.from);
  }

  calcTop() {
    return SLOT_SCALING * this.state.from;
  }

  render() {
    return (
      <Item
        style={{
          position: "absolute",
          height: this.calcHeight(),
          top: this.calcTop(),
          background: "gray",
        }}
      >
        from: {this.state.from}
        to: {this.state.to}
      </Item>
    );
  }
}

Slot.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
};