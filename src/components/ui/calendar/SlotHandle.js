import PropTypes from "prop-types";
import { SLOT_SCALING } from "./config";

export const SlotHandle = (props) => {
    const calcBottom = () => (SLOT_SCALING * (props.timeTo - props.timeFrom - 1))
  return (
    <div
      style={{
        position: "relative",
        top: calcBottom() - SLOT_SCALING/3,
        height: SLOT_SCALING/3,
        background: "orange",
        opacity: 0.5,
      }}
    />
  );
};

SlotHandle.propTypes = {
  timeFrom: PropTypes.number,
  timeTo: PropTypes.number,
};
