import * as React from "react";
import PropTypes from "prop-types";
import { Slot } from "../Slot";

export class FixedSlot extends React.Component {
  render() {
    let content;
    switch (this.props.type) {
      case "team":
        content = <div>team</div>;
        break;
      case "user":
        content = <div>user</div>;
        break;
      default:
        content = <div>incorrect type {this.props.type}</div>;
    }
    return (
      <Slot timeFrom={this.props.timeFrom} timeTo={this.props.timeTo}>
        {content}
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