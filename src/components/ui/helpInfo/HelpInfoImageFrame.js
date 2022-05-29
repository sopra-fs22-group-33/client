import Box from "@mui/material/Box";
import PropTypes from "prop-types";

export const HelpInfoImageFrame = (props) => (
  <Box sx={{ padding: "2.5em" }}>
    <img src={props.src} style={{ width: "75%", height: "auto" }} alt={" "} />
  </Box>
);

HelpInfoImageFrame.propTypes = {
    src: PropTypes.string.isRequired,
}
