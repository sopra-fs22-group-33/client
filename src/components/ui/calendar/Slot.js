import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { SLOT_SCALING } from "./config";

/**
 * Generic reused slot component which can calculate its top, height and width
 */
export class Slot extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.handleClick = props.handleClick;

    this.state = {
      timeFrom: props.timeFrom,
      timeTo: props.timeTo,
    };
  }

  calcTop() {
    return SLOT_SCALING * this.state.timeFrom;
  }

  calcHeight() {
    return SLOT_SCALING * (this.state.timeTo - this.state.timeFrom);
  }

  render() {
    return (
      <Box
        sx={{
          position: "absolute",
          height: this.calcHeight(),
          width: 3 / 4,
          top: this.calcTop(),
          background: this.props.style.background,
          opacity: 0.5,
        }}
        onMouseDown={this.props.onMouseDown}
        onMouseMove={this.props.onMouseMove}
        onClick={this.props.onClick}
        onMouseUp={this.props.onMouseUp}
        onKeyPress={this.props.onKeyPress}
      >{this.props.children}</Box>
    );
  }
}

Slot.propTypes = {
  timeFrom: PropTypes.number.isRequired,
  timeTo: PropTypes.number.isRequired,
  style: PropTypes.object,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  onClick: PropTypes.func,
  onMouseUp: PropTypes.func,
  onKeyPress: PropTypes.func,
};
