import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export const LoginGuard = (props) => {
  // if there is a token user is logged in
  if (!localStorage.getItem("token")) {
    return props.children;
  }
  return <Redirect to="/" />;
};

LoginGuard.propTypes = {
  children: PropTypes.node,
};