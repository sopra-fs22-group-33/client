import * as React from "react";
import PropTypes from "prop-types";
import { Slot } from "../Slot";
import { SlotPopper } from "../SlotPopper";
import { randomId } from "../../../../helpers/validations";

export class FixedSlot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHoveredOver: false,
      anchorEl: null,
    };
  }

  handleSlotMouseEnter(ev) {
    this.setState({ isHoveredOver: true, anchorEl: ev.currentTarget });
  }

  handleSlotMouseLeave(ev) {
    this.setState({ isHoveredOver: false, anchorEl: undefined });
  }

  getAssignedUsers(slot) {
    const assignedUsers = [];

    if (slot.hasOwnProperty("schedules") && slot.schedules.length > 0) {
      for (let s in slot.schedules) {
        const user = slot.schedules[s].user;
        if (user && slot.schedules[s].assigned === 1) {
          assignedUsers.push(user);
        }
      }
    }
    return assignedUsers;
  }

  getTeam(slot) {
    let team = null;

    if (slot.hasOwnProperty("schedules") && slot.schedules.length > 0) {
      team = slot.schedules[0].team;
    }
    return team;
  }

  render() {
    let content;
    switch (this.props.type) {
      case "team":
        content = (
          <div>
            {this.getAssignedUsers(this.props.slot).map((user) => (
              <div key={randomId()}>
                <div>username: {user.username}</div>
                <div>email: {user.email}</div>
              </div>
            ))}
          </div>
        );
        break;
      case "user":
        const team = this.getTeam(this.props.slot);
        content = <div>team: {team ? team.name : null}</div>;
        break;
      default:
        content = <div>incorrect type {this.props.type}</div>;
    }
    return (
      <Slot
        sx={this.props.sx}
        timeFrom={this.props.timeFrom}
        timeTo={this.props.timeTo}
        onMouseEnter={(ev) => this.handleSlotMouseEnter(ev)}
        onMouseLeave={(ev) => this.handleSlotMouseLeave(ev)}
        onMouseDown={(ev) => console.log(this.props.slot)} // todo: remove debug help
      >
        {this.state.isHoveredOver ? (
          <SlotPopper anchorEl={this.state.anchorEl}>{content}</SlotPopper>
        ) : null}
      </Slot>
    );
  }
}

FixedSlot.propTypes = {
  id: PropTypes.number.isRequired,
  slot: PropTypes.object.isRequired,
  timeFrom: PropTypes.number.isRequired,
  timeTo: PropTypes.number.isRequired,

  type: PropTypes.string.isRequired /* type: "team" || "user" */,
};