import PropTypes from "prop-types";
import { PIXEL_TO_HOUR } from "./config";

/**
 * Generic handle for resizable slots
 */
export const SlotHandle = (props) => {
  // finds bottom of the slot relative to slider
  // todo: find relative to slot top
  const calcBottom = () => PIXEL_TO_HOUR * (props.timeTo - props.timeFrom - 1);
  return (
    <div
      style={{
        position: "relative",
        top: calcBottom() - PIXEL_TO_HOUR / 3,
        height: PIXEL_TO_HOUR / 3,
        background: "white",
      }}
      onMouseDown={props.onMouseDown}
    />
  );
};

SlotHandle.propTypes = {
  timeFrom: PropTypes.number,
  timeTo: PropTypes.number,

  onMouseDown: PropTypes.func,
};
