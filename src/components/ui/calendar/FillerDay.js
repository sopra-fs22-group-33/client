import PropTypes from "prop-types";
import { Day } from "./Day";

export const FillerDay = (props) => (
  <Day
    date={props.date}
    hideDate={true}
    style={{ background: "rgba(200, 200, 200, 0.5)" }}
  />
);

FillerDay.propTypes = {
  date: PropTypes.object.isRequired,
};