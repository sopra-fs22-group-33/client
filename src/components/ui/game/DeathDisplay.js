import PropTypes from "prop-types";
import * as React from "react";
import { Button } from "../Button";
import { useHistory } from "react-router-dom";

export const DeathDisplay = (props) => {
  const history = useHistory();
  return (
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
      <Button onClick={() => history.push("/game/lobby")}>Leave</Button>
    </div>
  );
};

DeathDisplay.propTypes = {
  length: PropTypes.number.isRequired,
};