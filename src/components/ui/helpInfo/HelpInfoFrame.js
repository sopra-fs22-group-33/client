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
      <Popper open={anchorEl != null} anchorEl={anchorEl}>
        <Box>
          {history.location.pathname} {getHelperInfo(history.location.pathname)}
        </Box>
      </Popper>
    </div>
  );
};