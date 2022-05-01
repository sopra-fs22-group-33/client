import * as React from "react";
import PropTypes from "prop-types";
import { SLOT_SCALING } from "./config";
import Box from "@mui/material/Box";
import CalendarGlobal from "./CalendarGlobal";
import CalendarEventDispatcher from "./CalendarEventDispatcher";
import { FormField } from "../FormField";

export class AdminSlot extends React.Component {
  constructor(props) {
    super(props);
    this.ref = undefined;
    this.id = props.slot.id;
    this.hasUpdated = false;
    this.startedUpdating = false;
    this.updatingTop = undefined;

    // reference to object in parent
    this.slot = props.slot;

    this.state = {
      timeFrom: props.timeFrom,
      timeTo: props.timeTo,
      requirement: props.requirement,
      schedules: props.schedules,
    };
  }

  isSelected() {
    return this.id === CalendarGlobal.getSelectedSlot();
  }

  deselect() {
    CalendarGlobal.setSelectedSlot(this.isSelected() ? null : this.id);
    CalendarEventDispatcher.dispatch("onSlotSelected");
  }

  updateRequirement(value) {
    this.slot.requirement = value;
    this.setState({ requirement: value });
  }

  calcHeight() {
    return SLOT_SCALING * (this.state.timeTo - this.state.timeFrom);
  }

  calcTop() {
    return SLOT_SCALING * this.state.timeFrom;
  }

  onClick(ev) {
    ev.stopPropagation();
    if (!this.hasUpdated) {
      this.deselect();
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
        const newTimeFrom = Math.floor(this.state.timeFrom);
        this.slot.timeFrom = newTimeFrom;
        this.setState({ timeFrom: newTimeFrom });
      } else {
        const newTimeTo = Math.floor(this.state.timeTo);
        this.slot.timeTo = newTimeTo;
        this.setState({ timeTo: newTimeTo });
      }
    }
  }

  onMouseMove(ev) {
    if (this.isSelected() && this.startedUpdating) {
      ev.stopPropagation();

      if (this.updatingTop) {
        this.setState({
          timeFrom: this.state.timeFrom + ev.movementY / SLOT_SCALING,
        });
      } else {
        this.setState({
          timeTo: this.state.timeTo + ev.movementY / SLOT_SCALING,
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
          opacity: 0.5,
        }}
        onClick={(ev) => this.onClick(ev)}
        onMouseDown={(ev) => this.onMouseDown(ev)}
        onMouseMove={(ev) => this.onMouseMove(ev)}
        onMouseUp={(ev) => this.onMouseUp(ev)}
      >
        required people:{this.state.requirement}
        <FormField
          onClick={() => this.deselect.call(this)}
          value={this.state.requirement}
          onChange={(value) => this.updateRequirement(value)}
        />
      </Box>
    );
  }
}

AdminSlot.propTypes = {
    timeFrom: PropTypes.number,
    timeTo: PropTypes.number,
};
