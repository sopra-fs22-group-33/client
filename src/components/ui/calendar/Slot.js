import * as React from "react";
import PropTypes from "prop-types";
import { SLOT_SCALING } from "./config";
import Box from "@mui/material/Box";
import CalendarGlobal from "./CalendarGlobal";
import CalendarEventDispatcher from "./CalendarEventDispatcher";

export class Slot extends React.Component {
  constructor(props) {
    super(props);
    this.ref = undefined;
    this.id = props.id;
    this.hasUpdated = false;
    this.startedUpdating = false;
    this.updatingTop = undefined;

    this.state = {
      from: props.from,
      to: props.to,

      base: props.base ? props.base : {},
      special: props.special ? props.special : {},
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
      CalendarEventDispatcher.dispatch("onSlotSelected");
    }
    this.startedUpdating = false;
  }

  onMouseDown(ev) {
    ev.stopPropagation();
    this.startedUpdating = this.isSelected();

    if (this.startedUpdating) {
      const rect = this.ref.getBoundingClientRect();
      this.updatingTop = ev.clientY - (rect.y + rect.height / 2) < 0;
    }
  }

  onMouseUp(ev) {
    ev.stopPropagation();
    this.hasUpdated = this.startedUpdating;
    this.startedUpdating = false;
    if (this.hasUpdated) {
      if (this.updatingTop) {
        this.setState({ from: Math.floor(this.state.from) });
      } else {
        this.setState({ to: Math.ceil(this.state.to) });
      }
    }
    // todo: update slot in parent day
  }

  onMouseMove(ev) {
    if (this.isSelected() && this.startedUpdating) {
      ev.stopPropagation();

      if (this.updatingTop) {
        this.setState({ from: this.state.from + ev.movementY / SLOT_SCALING });
      } else {
        this.setState({
          to: this.state.to + ev.movementY / SLOT_SCALING,
        });
      }
    }
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
