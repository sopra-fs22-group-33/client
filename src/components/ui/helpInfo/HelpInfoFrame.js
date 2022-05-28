import { AiFillQuestionCircle } from "react-icons/ai";
import React, { useState } from "react";
import { Popper } from "@mui/material";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import { getHelperInfo } from "./HelpInfoContent";

export const HelpInfoFrame = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleMouseEnter = (ev) => {
    setAnchorEl(ev.currentTarget);
  };
  const handleMouseLeave = (ev) => {
    setAnchorEl(null);
  };
  return (
    <div>
      <AiFillQuestionCircle
        size={30}
        color={"#3C4FFA"}
        onMouseEnter={(ev) => handleMouseEnter(ev)}
        onMouseLeave={(ev) => handleMouseLeave(ev)}
      />
      <Popper
        open={anchorEl != null}
        anchorEl={anchorEl}
        placement={"left-start"}
      >
        <Box
          sx={{
            background: "white",
            padding: "1.5em",
            marginBottom: "1.5%",
            borderRadius: "1.5vh",
            border: 1,
            borderColor: "gray",
          }}
        >
            <div>{getHelperInfo(history.location.pathname)}</div>
        </Box>
      </Popper>
    </div>
  );
};