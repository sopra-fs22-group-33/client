import * as React from "react";
import { Slider } from "@mui/material";
import PropTypes from "prop-types";
import "styles/ui/Calendar.scss";

/**
 * Generic slot slider with functionality required in any calendar
 */
export class SlotSlider extends React.Component {

  render() {
    return (
      <Slider
        className={"calendar slot-slider"}
        style={this.props.style}
        onClick={this.props.onClick}
        onChange={this.props.onChange}
        onMouseDown={this.props.onMouseDown}
        value={this.props.value}
        valueLabelDisplay={this.props.valueLabelDisplay}
        step={this.props.step}
        marks={this.props.marks}
        min={this.props.min}
        max={this.props.max}
      />
    );
  }
}

SlotSlider.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  // from Slider
  // valueLabelDisplay: PropTypes.string,
  value: PropTypes.number,
  step: PropTypes.number,
  marks: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
};
