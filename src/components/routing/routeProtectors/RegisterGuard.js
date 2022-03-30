import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export const RegisterGuard = (props) => {
  // if there is a token user is logged in
  if (!localStorage.getItem("token")) {
    return props.children;
  }
  return <Redirect to="/" />;
};

RegisterGuard.propTypes = {
  children: PropTypes.node,
};