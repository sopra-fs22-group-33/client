import { AiFillQuestionCircle } from "react-icons/ai";
import React, { useState } from "react";
import { Popper } from "@mui/material";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import { getHelperInfo } from "./HelpInfoContent";
import "../../../styles/_theme.scss";

export const HelpInfoFrame = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleMouseEnter = (ev) => {
    setAnchorEl(ev.currentTarget);
  };
  const handleMouseLeave = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <svg width="0" height="0">
        <linearGradient id="blue-gradient" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop stopColor="#3DD7F9" offset="0%" />
          <stop stopColor="#3C4FFA" offset="100%" />
        </linearGradient>
      </svg>
      <AiFillQuestionCircle
        size={"3vh"}
        fill={"url(#blue-gradient)"}
        onMouseEnter={(ev) => handleMouseEnter(ev)}
        onMouseLeave={() => handleMouseLeave()}
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
            boxShadow: 2,
            maxWidth: "30vw",
          }}
        >
          <h3 style={{ paddingTop: "0", marginTop: "0" }}>Instructions</h3>
          <div style={{ fontSize: "1.6vh" }}>
            {getHelperInfo(history.location.pathname)}
          </div>
        </Box>
      </Popper>
    </div>
  );
};