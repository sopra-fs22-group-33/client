import PropTypes from "prop-types";
import { SLOT_SCALING } from "./config";

export const SlotHandle = (props) => {
  const calcBottom = () => SLOT_SCALING * (props.timeTo - props.timeFrom - 1);
  return (
    <div
      style={{
        position: "relative",
        top: calcBottom() - SLOT_SCALING / 3,
        height: SLOT_SCALING / 3,
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
