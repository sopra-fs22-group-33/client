import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { SLOT_SCALING } from "./config";
import "styles/ui/Calendar.scss";

/**
 * Generic reused slot component which can calculate its top, height and width
 */
export class Slot extends React.Component {
  calcTop() {
    return SLOT_SCALING * this.props.timeFrom;
  }

  calcHeight() {
    return SLOT_SCALING * (this.props.timeTo - this.props.timeFrom);
  }

  render() {
    return (
      <Box
        className={"calendar slot"}
        sx={{
          position: "absolute",
          height: this.calcHeight(),
          width: 3 / 4,
          top: this.calcTop(),
        }}
        style={this.props.style} /* overrides */
        onMouseDown={this.props.onMouseDown}
        onMouseMove={this.props.onMouseMove}
        onClick={this.props.onClick}
        onMouseUp={this.props.onMouseUp}
        onKeyPress={this.props.onKeyPress}
      >
        {this.props.children}
      </Box>
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
