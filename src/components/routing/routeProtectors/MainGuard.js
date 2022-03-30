import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Check that user is authenticated and authorized
 *
 * @param props
 */
export const MainGuard = (props) => {
  if (localStorage.getItem("token")) {
    return props.children;
  }

  return <Redirect to="/" />;
};

MainGuard.propTypes = {
  children: PropTypes.node,
};
