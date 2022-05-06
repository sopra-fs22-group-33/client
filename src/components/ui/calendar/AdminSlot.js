import React from "react";
import PropTypes from "prop-types";
import { Slot } from "./Slot";
import { SlotSlider } from "./SlotSlider";
import { MAX_REQUIREMENT, MIN_REQUIREMENT, SLOT_SCALING } from "./config";
import calendarGlobal from "./calendarGlobal";
import calendarEventDispatcher from "./calendarEventDispatcher";

export class AdminSlot extends React.Component {
  constructor(props) {
    super(props);

    this.id = props.id;
    this.slot = props.slot;

    this.handleGlobalMouseUp = this.handleGlobalMouseUp.bind(this);
    this.handleGlobalMouseMove = this.handleGlobalMouseMove.bind(this);

    this.state = {
      timeFrom: props.timeFrom,
      timeTo: props.timeTo,
      requirement: props.requirement ? props.requirement : 1,

      isDragged: false,
    };
  }

  handleSlotMouseDown(ev) {
    // prevent creation of new slot
    ev.stopPropagation();
    calendarGlobal.setSelectedSlot(this.id);
    calendarEventDispatcher.dispatch("onSlotSelected");
    window.addEventListener("mouseup", this.handleGlobalMouseUp);
    window.addEventListener("mousemove", this.handleGlobalMouseMove);
    this.setState({ isDragged: true });
  }

  handleGlobalMouseMove(ev) {
    if (this.state.isDragged) {
      this.setState({
        timeTo: this.state.timeTo + ev.movementY / SLOT_SCALING,
      });
    }
  }

  handleGlobalMouseUp(ev) {
    // global, make sure this is being changed
    if (this.state.isDragged) {
      window.removeEventListener("mouseup", this.handleGlobalMouseUp);
      window.removeEventListener("mousemove", this.handleGlobalMouseUp);
      this.setState({ isDragged: false });

      let from = Math.floor(this.state.timeFrom),
        to = Math.ceil(this.state.timeTo);
      if (to - from < 1) {
        to = from + 1;
      }
      this.slot.timeFrom = from;
      this.slot.timeTo = to;
      this.setState({ timeFrom: from, timeTo: to });
      calendarEventDispatcher.dispatch("onSlotUpdated");
    }
  }

  handleSlotClick(ev) {
    ev.stopPropagation();
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
        sx={this.props.sx}
        style={{
          background: !this.state.isDragged
            ? "rgba(50, 0, 255, ".concat(
                (this.state.requirement / MAX_REQUIREMENT).toString(),
                ")"
              )
            : null,
        }}
        timeFrom={this.state.timeFrom}
        timeTo={this.state.timeTo}
        onClick={(ev) => this.handleSlotClick(ev)}
        onMouseDown={(ev) => this.handleSlotMouseDown(ev)}
      >
        {!this.state.isDragged &&
        this.id === calendarGlobal.getSelectedSlot() ? (
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
