import * as React from "react";
import PropTypes from "prop-types";
import { Slot } from "./Slot";
import { MAX_SPECIAL, MIN_SPECIAL } from "./config";
import { SlotSlider } from "./SlotSlider";

/**
 * Convert frontend to backend representation
 */
function frontToBackSpecial(value) {
  switch (value) {
    case -1:
      return 0;
    case 0:
      return -1;
    case 1:
      return 1;
    default:
      console.log("unhandled value", value);
      return value;
  }
}

/**
 * Convert backend to frontend representation
 */
function backToFrontSpecial(value) {
  switch (value) {
    case 0:
      return -1;
    case -1:
      return 0;
    case 1:
      return 1;
    default:
      console.log("unhandled value", value);
      return value;
  }
}

export class MemberSlot extends React.Component {
  constructor(props) {
    super(props);
    this.ref = undefined;
    this.id = props.id;

    // reference to object in parent
    this.slot = props.slot;

    this.state = {
      isSelected: false,
      mySchedule: this.getSchedule(),
    };
  }

  handleClick(ev) {
    this.setState({ isSelected: !this.state.isSelected });
  }

  handleSliderChange(ev, value) {
    const schedule = this.state.mySchedule;
    schedule.special = frontToBackSpecial(value);
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
      special: frontToBackSpecial(0),
      user: { id: userId },
    };
    this.slot.schedules.push(newSchedule);
    return newSchedule;
  }

  getColor() {
    const special = backToFrontSpecial(this.state.mySchedule.special);
    switch (special) {
      // disliked
      case -1:
        return "rgba(196, 128, 18, 0.5)";
      case 0:
        return null;
      case 1:
        return "rgba(50, 0, 255, 0.5)";
    }
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
        {this.state.isSelected ? (
          <SlotSlider
            onChange={(ev, value) => this.handleSliderChange(ev, value)}
            value={backToFrontSpecial(this.state.mySchedule.special)}
            valueLabelDisplay={"auto"}
            step={1}
            marks
            min={MIN_SPECIAL}
            max={MAX_SPECIAL}
          />
        ) : null}
        <div>req: {this.props.requirement}</div>
        {this.state.mySchedule ? (
          <div>
            my special: {backToFrontSpecial(this.state.mySchedule.special)}
          </div>
        ) : null}
      </Slot>
    );
  }
}

MemberSlot.propTypes = {
  id: PropTypes.number.isRequired,
  slot: PropTypes.object.isRequired,
  timeFrom: PropTypes.number.isRequired,
  timeTo: PropTypes.number.isRequired,
  requirement: PropTypes.number,

  sx: PropTypes.object,
};
