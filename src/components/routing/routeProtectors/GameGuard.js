import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export const GameGuard = (props) => {
  if (sessionStorage.getItem("gameId")) {
    return props.children;
  }

  return <Redirect to="/game/lobby" />;
};

GameGuard.propTypes = {
  children: PropTypes.node,
};