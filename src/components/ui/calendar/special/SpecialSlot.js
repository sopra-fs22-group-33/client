import * as React from "react";
import PropTypes from "prop-types";
import { Slot } from "../Slot";
import { SlotPopper } from "../SlotPopper";
import { Button, Button2 } from "../../Button";
import { AiFillHeart } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import calendarEventDispatcher from "../calendarEventDispatcher";

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

export class SpecialSlot extends React.Component {
  constructor(props) {
    super(props);
    this.ref = undefined;
    this.id = props.id;

    // reference to object in parent
    this.slot = props.slot;

    this.state = {
      anchorEl: null,
      isHoveredOver: false,
      mySchedule: this.getSchedule(),
    };
  }

  handleSlotMouseEnter(ev) {
    this.setState({ isHoveredOver: true, anchorEl: ev.currentTarget });
  }

  handleSlotMouseLeave(ev) {
    this.setState({ isHoveredOver: false, anchorEl: undefined });
  }

  handleJokerChange(ev, value) {
    const schedule = this.state.mySchedule;
    schedule.special = frontToBackSpecial(value);
    this.setState({ mySchedule: schedule });
    calendarEventDispatcher.dispatch("onJokerUpdated");
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
      base: 0,
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
      case 1:
        return "rgba(50, 0, 255, 0.5)";
      default:
        return "rgba(179, 215, 249, 0.5)";
    }
  }

  render() {
    return (
      <Slot
        sx={this.props.sx}
        style={{ background: this.state.mySchedule ? this.getColor() : null }}
        timeFrom={this.props.timeFrom}
        timeTo={this.props.timeTo}
        onMouseEnter={(ev) => this.handleSlotMouseEnter(ev)}
        onMouseLeave={(ev) => this.handleSlotMouseLeave(ev)}
      >
        {this.state.isHoveredOver ? (
          <SlotPopper anchorEl={this.state.anchorEl}>
            <div>requirement: {this.props.requirement}</div>
            <div>
              <Button2
                disabled={
                  this.state.mySchedule.special === frontToBackSpecial(1)
                }
                onClick={(ev) => this.handleJokerChange(ev, 1)}
              >
                <AiFillHeart />
              </Button2>
              <Button2
                disabled={
                  this.state.mySchedule.special === frontToBackSpecial(-1)
                }
                onClick={(ev) => this.handleJokerChange(ev, -1)}
              >
                <ImCross />
              </Button2>
            </div>
            <Button2
              disabled={this.state.mySchedule.special === frontToBackSpecial(0)}
              onClick={(ev) => this.handleJokerChange(ev, 0)}
            >
              clear
            </Button2>
          </SlotPopper>
        ) : null}
      </Slot>
    );
  }
}

SpecialSlot.propTypes = {
  id: PropTypes.number.isRequired,
  slot: PropTypes.object.isRequired,
  timeFrom: PropTypes.number.isRequired,
  timeTo: PropTypes.number.isRequired,
  requirement: PropTypes.number,

  sx: PropTypes.object,
};
