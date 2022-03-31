import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Check that user is authenticated
 *
 * @param props
 * @returns {JSX.Element|*}
 */
export const AppGuard = (props) => {
  if (localStorage.getItem("token")) {
    return props.children;
  }

  return <Redirect to="/welcome" />;
};

AppGuard.propTypes = {
  children: PropTypes.node,
};
