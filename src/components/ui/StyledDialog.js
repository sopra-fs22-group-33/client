import { Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

export const StyledDialog = (props) => (
  <Dialog open={props.open}>
    <Box sx={{ padding: 10 }}>{props.children}</Box>
  </Dialog>
);

StyledDialog.propTypes = {
  open: PropTypes.bool,
};