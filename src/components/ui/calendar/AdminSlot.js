import React from "react";
import PropTypes from "prop-types";
import { Slot } from "./Slot";
import { SlotSlider } from "./SlotSlider";
import { MAX_REQUIREMENT, MIN_REQUIREMENT, PIXEL_TO_HOUR } from "./config";
import calendarGlobal from "./calendarGlobal";
import calendarEventDispatcher from "./calendarEventDispatcher";
import { SlotHandle } from "./SlotHandle";

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

  handleHandleMouseDown(ev) {
    // prevent creation of new slot
    ev.stopPropagation();
    window.addEventListener("mouseup", this.handleGlobalMouseUp);
    window.addEventListener("mousemove", this.handleGlobalMouseMove);
    this.setState({ isResized: true });
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
      const from = this.state.timeFrom + ev.movementY / PIXEL_TO_HOUR;
      const to = this.state.timeTo + ev.movementY / PIXEL_TO_HOUR;
      if (from >= 0 && to <= 24) {
        this.setState({
        timeFrom: from,
        timeTo: to,
      });
      }
    }
    if (this.state.isResized) {
      const to = this.state.timeTo + ev.movementY / PIXEL_TO_HOUR;
      if (to - this.state.timeFrom >= 1) {
        this.setState({
        timeTo: to,
      });
      }
    }
  }

  handleGlobalMouseUp(ev) {
    // global, make sure this is being changed
    if (this.state.isDragged || this.state.isResized) {
      window.removeEventListener("mouseup", this.handleGlobalMouseUp);
      window.removeEventListener("mousemove", this.handleGlobalMouseMove);
      this.setState({ isDragged: false, isResized: false });

      let from = Math.round(this.state.timeFrom);
      let to = Math.round(this.state.timeTo);
      from = (from > 0) ? from : 0;
      to = (to - from >= 1) ? to : from + 1;
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
          <div>
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
            <SlotHandle
              onMouseDown={(ev) => this.handleHandleMouseDown(ev)}
              timeFrom={this.state.timeFrom}
              timeTo={this.state.timeTo}
            />
          </div>
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
