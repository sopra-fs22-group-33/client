import * as React from "react";
import PropTypes from "prop-types";

export const CalendarNavigationButtons = (props) => (
  <div /* buttons should have different styling from ../../ui/Button*/>
    {props.onBigBack ? (
      <button onClick={props.onBigBack}>big back arrow</button>
    ) : null}
    {props.onBack ? <button onClick={props.onBack}>back arrow</button> : null}
    {props.onForwards ? (
      <button onClick={props.onForwards}>forwards arrow</button>
    ) : null}
    {props.onBigForwards ? (
      <button onClick={props.onBigForwards}>big forwards arrow</button>
    ) : null}
  </div>
);

CalendarNavigationButtons.propTypes = {
  onBigBack: PropTypes.func,
  onBack: PropTypes.func,
  onForwards: PropTypes.func,
  onBigForwards: PropTypes.func,
};