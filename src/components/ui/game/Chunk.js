import * as React from "react";
import PropTypes from "prop-types";
import { CHUNK_LENGTH } from "./helpers";
import Box from "@mui/material/Box";

export const Chunk = (props) => {
  return (
    <Box
      onClick={() => console.log("x:", props.x, "\ny:", props.y)}
      sx={{
        position: "absolute",
        top: props.y,
        left: props.x,
        height: CHUNK_LENGTH,
        width: CHUNK_LENGTH,
        background: props.background,
        borderRadius: "0.3vh",
        border: 1,
        borderColor: "black",
      }}
    />
  );
};

Chunk.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};
