import React from "react";
import PropTypes from "prop-types";
import { Slot } from "./Slot";
import { SlotSlider } from "./SlotSlider";
import { MAX_REQUIREMENT, MIN_REQUIREMENT, SLOT_SCALING } from "./config";

export class AdminSlot extends React.Component {
  constructor(props) {
    super(props);

    this.id = props.id;
    this.slot = props.slot;

    this.handleGlobalMouseUp = this.handleGlobalMouseUp.bind(this);
    this.handleGlobalMouseMove = this.handleGlobalMouseMove.bind(this);

    // no need to rerender on change
    this.isDragged = false;

    this.state = {
      timeFrom: props.timeFrom,
      timeTo: props.timeTo,
      requirement: props.requirement ? props.requirement : 1,

      isSelected: false,
    };
  }

  handleSlotMouseDown(ev) {
    // prevent creation of new slot
    ev.stopPropagation();
    if (this.state.isSelected) {
      window.addEventListener("mouseup", this.handleGlobalMouseUp);
      window.addEventListener("mousemove", this.handleGlobalMouseMove);
      this.isDragged = true;
      this.setState({ isSelected: false });
    }
  }

  handleGlobalMouseMove(ev) {
    if (this.isDragged) {
      this.setState({
        timeTo: this.state.timeTo + ev.movementY / SLOT_SCALING,
      });
    }
  }

  handleGlobalMouseUp(ev) {
    if (this.isDragged) {
      window.removeEventListener("mouseup", this.handleGlobalMouseUp);
      window.removeEventListener("mousemove", this.handleGlobalMouseUp);
      this.isDragged = false;
      this.setState({ isSelected: true });

      let from = Math.floor(this.state.timeFrom),
        to = Math.ceil(this.state.timeTo);
      if (to - from < 1) {
        to = from + 1;
      }
      this.setState({ timeFrom: from, timeTo: to });
    }
  }

  handleSlotClick(ev) {
    ev.stopPropagation();
    this.setState({ isSelected: true });
  }

  handleSliderChange(ev, value) {
    this.slot.requirement = value;
    this.setState({ requirement: value });
  }

  handleSliderClick(ev) {
    // prevent deselection of the slot
    ev.stopPropagation();
  }

  handleSliderMouseDown(ev) {
    // prevent creation of new slot and dragging
    ev.stopPropagation();
  }

  render() {

    return (
      <Slot
        style={{ background: this.state.isSelected ? "rgba(0, 0, 255, ".concat(this.state.requirement/MAX_REQUIREMENT, ")" ) : null}}
        timeFrom={this.state.timeFrom}
        timeTo={this.state.timeTo}
        onClick={(ev) => this.handleSlotClick(ev)}
        onMouseDown={(ev) => this.handleSlotMouseDown(ev)}
      >
        {this.state.isSelected ? (
          <SlotSlider
            style={{
              position: "relative",
              top: -20 /* easier than trying to find height of slot */,
            }}
            onClick={(ev) => this.handleSliderClick(ev)}
            onChange={(ev, value) => this.handleSliderChange(ev, value)}
            onMouseDown={(ev) => this.handleSliderMouseDown(ev)}
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
