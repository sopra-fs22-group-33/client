import React from "react";
import PropTypes from "prop-types";
import { Slot } from "./Slot";
import { SlotSlider } from "./SlotSlider";
import { MAX_REQUIREMENT, MIN_REQUIREMENT } from "./config";

export class AdminSlot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeFrom: props.timeFrom,
      timeTo: props.timeTo,
      requirement: props.requirement ? props.requirement : 1,

      isSelected: false,
    };
  }

  handleMouseDown(ev) {
    // set to dragged
    // notify calendar
  }

  handleSlotClick(ev) {
    ev.stopPropagation();
    this.setState({ isSelected: !this.state.isSelected });

    console.log(this.state.requirement);
  }

  handleSliderChange(ev, value) {
    this.setState({ requirement: value });
  }

  handleSliderClick(ev) {
    // prevent deselection of the slot
    ev.stopPropagation();
  }

  render() {
    return (
      <Slot
        timeFrom={this.props.timeFrom}
        timeTo={this.props.timeTo}
        style={{ background: "gray" }}
        onClick={(ev) => this.handleSlotClick(ev)}
        onMouseDown={(ev) => this.handleMouseDown(ev)}
        onMouseMove={(ev) => this.handleMouseMove(ev)}
        onMouseUp={(ev) => this.handleMouseUp(ev)}
      >
        {this.state.isSelected ? (
          <SlotSlider
            style={{
              position: "relative",
              top: -20 /* easier than trying to find height of slot */,
            }}
            onClick={(ev) => this.handleSliderClick(ev)}
            onChange={(ev, value) => this.handleSliderChange(ev, value)}
            value={this.state.requirement}
            valueLabelDisplay={"auto"}
            step={1}
            marks
            min={MIN_REQUIREMENT}
            max={MAX_REQUIREMENT}
          />
        ) : null}
      </Slot>
    );
  }
}

AdminSlot.propTypes = {
  id: PropTypes.number.isRequired,
  slot: PropTypes.object,
  timeFrom: PropTypes.number.isRequired,
  timeTo: PropTypes.number.isRequired,
  requirement: PropTypes.number,
};
