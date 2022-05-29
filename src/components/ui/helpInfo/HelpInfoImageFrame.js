import Box from "@mui/material/Box";
import PropTypes from "prop-types";

export const HelpInfoImageFrame = (props) => (
  <Box sx={{ padding: "2.5em" }}>
    <img src={props.src} style={{ maxWidth: "25vw", height: "auto", maxHeight: "40vh" }} alt={" "} />
  </Box>
);

HelpInfoImageFrame.propTypes = {
    src: PropTypes.string.isRequired,
}
