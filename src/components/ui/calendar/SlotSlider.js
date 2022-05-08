import * as React from "react";
import { Slider } from "@mui/material";
import PropTypes from "prop-types";
import "styles/ui/Calendar.scss";
import { HOUR_HEIGHT } from "./config";

/**
 * Generic slot slider with functionality required in any calendar
 */
export const SlotSlider = (props) => {
  const padding = HOUR_HEIGHT / 2;
  const height = 4;
  return (
    <Slider
      className={"calendar slot-slider"}
      style={{
        position: "absolute",
        top: -2 * padding - height,
        height: height,
        background: "white",
        padding: padding,
      }}
      onClick={props.onClick}
      onChange={props.onChange}
      onMouseDown={props.onMouseDown}
      value={props.value}
      size={"small"}
      valueLabelDisplay={props.valueLabelDisplay}
      step={props.step}
      marks={props.marks}
      min={props.min}
      max={props.max}
    />
  );
};

SlotSlider.propTypes = {
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
