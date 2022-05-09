import * as React from "react";
import PropTypes from "prop-types";
import { Slot } from "../Slot";
import { MAX_BASE, MIN_BASE } from "../config";
import { SlotSlider } from "../SlotSlider";
import { SlotPopper } from "../SlotPopper";
import calendarGlobal from "../calendarGlobal";
import calendarEventDispatcher from "../calendarEventDispatcher";

export class BaseSlot extends React.Component {
  constructor(props) {
    super(props);
    this.ref = undefined;
    this.id = props.id;

    // reference to object in parent
    this.slot = props.slot;

    this.state = {
      anchorEl: null,
      mySchedule: this.getSchedule(),
    };
  }

  handleClick(ev) {
    calendarGlobal.setSelectedSlot(this.id);
    calendarEventDispatcher.dispatch("onSlotSelected");
    this.setState({
      anchorEl: ev.currentTarget,
    });
  }

  handleSliderChange(ev, value) {
    const schedule = this.state.mySchedule;
    schedule.base = value;
    this.setState({ mySchedule: schedule });
  }

  getSchedule() {
    const userId = parseInt(sessionStorage.getItem("id"));
    for (let schedule of this.slot.schedules) {
      if (schedule.user.id === userId) {
        return schedule;
      }
    }
    // no schedule found
    const newSchedule = {
      base: 0,
      user: { id: userId },
    };
    this.slot.schedules.push(newSchedule);
    return newSchedule;
  }

  getColor() {
    const base = this.state.mySchedule.base;
    if (base > 0) {
      return "rgba(196, 128, 18,".concat(
        ((0.5 * base) / MAX_BASE).toString(),
        ")"
      );
    }
    if (base < 0) {
      return "rgba(50, 0, 255,".concat(
        ((0.5 * base) / MIN_BASE).toString(),
        ")"
      );
    }
    return null;
  }

  render() {
    return (
      <Slot
        sx={this.props.sx}
        style={{ background: this.state.mySchedule ? this.getColor() : null }}
        timeFrom={this.props.timeFrom}
        timeTo={this.props.timeTo}
        onClick={(ev) => this.handleClick(ev)}
      >
        {calendarGlobal.getSelectedSlot() === this.id ? (
          <SlotPopper anchorEl={this.state.anchorEl}>
            <SlotSlider
              onChange={(ev, value) => this.handleSliderChange(ev, value)}
              value={this.state.mySchedule.base}
              valueLabelDisplay={"auto"}
              step={1}
              marks
              min={MIN_BASE}
              max={MAX_BASE}
            />
            <div>requirement: {this.props.requirement}</div>
            <div>
              my base: {this.state.mySchedule.base}
            </div>
          </SlotPopper>
        ) : null}
      </Slot>
    );
  }
}

BaseSlot.propTypes = {
  id: PropTypes.number.isRequired,
  slot: PropTypes.object.isRequired,
  timeFrom: PropTypes.number.isRequired,
  timeTo: PropTypes.number.isRequired,
  requirement: PropTypes.number,

  sx: PropTypes.object,
};
