import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Check that user is not authenticated
 *
 * @param props
 * @returns {JSX.Element|*}
 */
export const AuthGuard = (props) => {
  if (!localStorage.getItem("token")) {
    return props.children;
  }
  return <Redirect to="/welcome" />;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};