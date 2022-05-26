import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Check that user is not authenticated
 *
 * @param props
 * @returns {JSX.Element|*}
 */
export const TeamGuard = (props) => {
  if (sessionStorage.getItem("teamId")) {
    return props.children;
  }
  return <Redirect to="/user/teams" />;
};

TeamGuard.propTypes = {
  children: PropTypes.node,
};