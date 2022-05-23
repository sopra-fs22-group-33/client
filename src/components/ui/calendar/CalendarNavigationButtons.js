import * as React from "react";
import PropTypes from "prop-types";
import {} from "react-icons/ai";
import {
  IoCaretBackSharp,
  IoCaretForwardSharp,
  IoPlayBackSharp,
  IoPlayForwardSharp,
} from "react-icons/io5";
import { Button } from "../Button";

export const CalendarNavigationButtons = (props) => (
  <div>
    {props.onBigBack ? (
      <Button onClick={props.onBigBack}>
        <IoPlayBackSharp />
      </Button>
    ) : null}
    {props.onBack ? (
      <Button onClick={props.onBack}>
        <IoCaretBackSharp />
      </Button>
    ) : null}
    {props.onForwards ? (
      <Button onClick={props.onForwards}>
        <IoCaretForwardSharp />
      </Button>
    ) : null}
    {props.onBigForwards ? (
      <Button onClick={props.onBigForwards}>
        <IoPlayForwardSharp />
      </Button>
    ) : null}
  </div>
);

CalendarNavigationButtons.propTypes = {
  onBigBack: PropTypes.func,
  onBack: PropTypes.func,
  onForwards: PropTypes.func,
  onBigForwards: PropTypes.func,
};