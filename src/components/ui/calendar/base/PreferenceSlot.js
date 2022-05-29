import * as React from "react";
import PropTypes from "prop-types";
import { MAX_BASE, MIN_BASE } from "../config";
import { Slot } from "../Slot";
import { SlotPopper } from "../SlotPopper";
import { SlotSlider } from "../SlotSlider";
import {baseToText} from "./BaseSlot";

export class PreferenceSlot extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;

    // reference to object in parent
    this.slot = props.slot;

    this.state = {
      anchorEl: null,
      isHoveredOver: false,
      base: props.base ? props.base : 0 /* else sliders are 'controlled' */,
    };
  }

  handleSlotMouseEnter(ev){
    this.setState({isHoveredOver: true, anchorEl: ev.currentTarget});
  }

  handleSlotMouseLeave() {
    this.setState({isHoveredOver: false, anchorEl: undefined});
  }

  handleSliderChange(ev, value) {
    this.slot.base = value;
    this.setState({ base: value });
  }

  getColor() {
    const base = this.state.base;
    if (base > 0) {
      return "rgba(50, 0, 255,".concat(
        ((0.5 * base) / MAX_BASE).toString(),
        ")"
      );
    }
    if (base < 0) {
      return "rgba(196, 128, 18,".concat(
        ((0.5 * base) / MIN_BASE).toString(),
        ")"
      );
    }
    return "rgba(179, 215, 249, 0.2)";
  }

  render() {
    return (
      <Slot
        sx={this.props.sx}
        style={{ background: this.getColor() }}
        timeFrom={this.props.timeFrom}
        timeTo={this.props.timeTo}
        onMouseEnter={(ev) => this.handleSlotMouseEnter(ev)}
        onMouseLeave={() => this.handleSlotMouseLeave()}
      >
        {this.state.isHoveredOver ? (
          <SlotPopper anchorEl={this.state.anchorEl}>
            <SlotSlider
              onChange={(ev, value) => this.handleSliderChange(ev, value)}
              width={120}

              value={this.state.base}
              valueLabelDisplay={"auto"}
              step={1}
              marks
              min={MIN_BASE}
              max={MAX_BASE}
            />
            <div>{baseToText(this.state.base)}</div>
          </SlotPopper>
        ) : null}
      </Slot>
    );
  }
}

PreferenceSlot.propTypes = {
  id: PropTypes.number.isRequired,
  slot: PropTypes.object.isRequired,
  timeFrom: PropTypes.number.isRequired,
  timeTo: PropTypes.number.isRequired,
  base: PropTypes.number,

  sx: PropTypes.object,
};