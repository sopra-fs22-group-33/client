import PropTypes from "prop-types";
import * as React from "react";

export const DeathDisplay = (props) => (
    <div
      style={{
        position: "relative",
        top: props.length / 2,
        background: "white",
        fontSize: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      YOU DIED
    </div>
  );

DeathDisplay.propTypes = {
  length: PropTypes.number.isRequired,
};