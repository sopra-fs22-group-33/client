import * as React from "react";
import PropTypes from "prop-types";
import {CHUNK_LENGTH} from "./helpers";

export const Chunk = (props) => {
  return (
    <div
      onClick={() => console.log("x:", props.x, "\ny:", props.y)}
      style={{
        position: "absolute",
        top: props.y,
        left: props.x,
        height: CHUNK_LENGTH,
        width: CHUNK_LENGTH,
        background: props.background,
      }}
    />
  );
};

Chunk.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};
