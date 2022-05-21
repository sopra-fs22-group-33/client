import PropTypes from "prop-types";
import { Day } from "./Day";

export const FillerDay = (props) => (
  <Day
    weekday={props.weekday}
    startingDate={props.startingDate}
    style={{ background: "rgba(200, 200, 200, 0.5)" }}
  />
);

FillerDay.propTypes = {
  weekday: PropTypes.number.isRequired,
  startingDate: PropTypes.string.isRequired,
};