import React from "react";
import PropTypes from "prop-types";
import { Slot } from "../Slot";
import { SlotSlider } from "../SlotSlider";
import { MAX_REQUIREMENT, MIN_REQUIREMENT, HOUR_HEIGHT } from "../config";
import calendarGlobal from "../calendarGlobal";
import calendarEventDispatcher from "../calendarEventDispatcher";
import { SlotHandle } from "../SlotHandle";
import { SlotPopper } from "../SlotPopper";

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
      isResized: false,
      isHoveredOver: false,
      anchorEl: null,
    };
  }

  handleSlotMouseEnter(ev) {
    calendarGlobal.setSelectedSlot(this.id);
    calendarEventDispatcher.dispatch(
      "onSlotSelected"
    ); /* necessary for deletion to work */
    this.setState({ isHoveredOver: true, anchorEl: ev.currentTarget });
  }

  handleSlotMouseLeave() {
    calendarGlobal.setSelectedSlot(null);
    this.setState({ isHoveredOver: false, anchorEl: undefined });
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
    window.addEventListener("mouseup", this.handleGlobalMouseUp);
    window.addEventListener("mousemove", this.handleGlobalMouseMove);
    this.setState({ isDragged: true });
  }

  handleGlobalMouseMove(ev) {
    if (this.state.isDragged) {
      const from = this.state.timeFrom + ev.movementY / HOUR_HEIGHT;
      const to = this.state.timeTo + ev.movementY / HOUR_HEIGHT;
      if (from >= 0 && to <= 24) {
        this.setState({
          timeFrom: from,
          timeTo: to,
        });
      }
    }
    if (this.state.isResized) {
      const to = this.state.timeTo + ev.movementY / HOUR_HEIGHT;
      if (to - this.state.timeFrom >= 1 && to <= 24) {
        this.setState({
          timeTo: to,
        });
      }
    }
  }

  handleGlobalMouseUp() {
    // global, make sure this is being changed
    if (this.state.isDragged || this.state.isResized) {
      window.removeEventListener("mouseup", this.handleGlobalMouseUp);
      window.removeEventListener("mousemove", this.handleGlobalMouseMove);
      this.setState({ isDragged: false, isResized: false });

      let from = Math.round(this.state.timeFrom);
      let to = Math.round(this.state.timeTo);
      from = from > 0 ? from : 0;
      to = to - from >= 1 ? to : from + 1;
      this.slot.timeFrom = from;
      this.slot.timeTo = to;
      this.setState({ timeFrom: from, timeTo: to });
      calendarGlobal.setSelectedSlot(this.id);
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
        onMouseEnter={(ev) => this.handleSlotMouseEnter(ev)}
        onMouseLeave={() => this.handleSlotMouseLeave()}
      >
        {!this.state.isDragged && this.state.isHoveredOver ? (
          <div>
            <SlotPopper anchorEl={this.state.anchorEl}>
              <SlotSlider
                onClick={(ev) => this.handleSliderClick(ev)}
                onChange={(ev, value) => this.handleSliderChange(ev, value)}
                onMouseDown={(ev) => this.handleSliderMouseDown(ev)}
                width={120}
                value={this.state.requirement}
                valueLabelDisplay={"auto"}
                step={1}
                marks
                min={MIN_REQUIREMENT}
                max={MAX_REQUIREMENT}
              />
              <div>requirement: {this.state.requirement}</div>
            </SlotPopper>
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
  slot: PropTypes.object.isRequired,
  timeFrom: PropTypes.number.isRequired,
  timeTo: PropTypes.number.isRequired,
  requirement: PropTypes.number,

  sx: PropTypes.object,
};
