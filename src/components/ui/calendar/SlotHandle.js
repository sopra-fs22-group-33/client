import PropTypes from "prop-types";
import { HOUR_HEIGHT } from "./config";

/**
 * Generic handle for resizable slots
 */
export const SlotHandle = (props) => {
  const height = HOUR_HEIGHT / 2; /* half an hour */
  const calcBottom = () => HOUR_HEIGHT * (props.timeTo - props.timeFrom);

  return (
    <div
      style={{
        position: "absolute",
        top: calcBottom() - height,
        height: height,
        width: "100%",
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
