import * as React from "react";
import PropTypes from "prop-types";
import { SLOT_SCALING } from "./config";
import Box from "@mui/material/Box";
import CalendarGlobal from "./CalendarGlobal";
import CalendarEventDispatcher from "./CalendarEventDispatcher";

export class Slot extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.hasUpdated = false;
    this.startedUpdating = false;

    this.state = {
      from: props.from,
      to: props.to,
    };
  }

  isSelected() {
    return this.id === CalendarGlobal.getSelectedSlot();
  }

  calcHeight() {
    return SLOT_SCALING * (this.state.to - this.state.from);
  }

  calcTop() {
    return SLOT_SCALING * this.state.from;
  }

  onClick(ev) {
    ev.stopPropagation();
    console.log("\n clicked on slot:", this.id, "\n");
    if (!this.hasUpdated) {
      CalendarGlobal.setSelectedSlot(this.isSelected() ? null : this.id);
      CalendarEventDispatcher.dispatch("slotSelected");
    }
    this.startedUpdating = false;
  }

  onMouseDown(ev) {
    ev.stopPropagation();
    this.startedUpdating = this.isSelected();
  }

  onMouseUp(ev) {
    ev.stopPropagation();
    this.hasUpdated = this.startedUpdating;
    this.startedUpdating = false;
    if (this.hasUpdated) {
      this.setState({ to: Math.ceil(this.state.to) });
    }
  }

  onMouseMove(ev) {
    if (this.isSelected() && this.startedUpdating) {
      ev.stopPropagation();
      this.setState({
        to: this.state.to + ev.movementY / SLOT_SCALING,
      });
    }
  }

  render() {
    return (
      <Box
        sx={{
          width: 3 / 4,
        }}
        style={{
          position: "absolute",
          height: this.calcHeight(),
          top: this.calcTop(),
          background: this.isSelected() ? "orange" : "gray",
        }}
        onClick={(ev) => this.onClick(ev)}
        onMouseDown={(ev) => this.onMouseDown(ev)}
        onMouseMove={(ev) => this.onMouseMove(ev)}
        onMouseUp={(ev) => this.onMouseUp(ev)}
      >
        from: {this.state.from}
        to: {this.state.to}
      </Box>
    );
  }
}

Slot.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
};
