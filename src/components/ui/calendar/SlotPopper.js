import { Popper } from "@mui/material";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

export const SlotPopper = (props) => {
  return (
    <Popper open={true} anchorEl={props.anchorEl} placement={"left-start"}>
      <Box
        sx={{
          padding: 2,
          borderRadius: 5,
          boxShadow: 2,
        }}
        style={{ background: "white" }}
      >
        {props.children}
      </Box>
    </Popper>
  );
};

SlotPopper.propTypes = {
  anchorEl: PropTypes.object,
};