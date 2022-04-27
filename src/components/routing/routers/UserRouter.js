import { Redirect, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { UserCalendar } from "components/views/User/UserCalendar";
import { UserProfile } from "components/views/User/UserProfile";
import { AllTeams } from "../../views/Team/AllTeams";

export const UserRouter = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path={`${props.base}/calendar`}>
          <UserCalendar />
        </Route>
        <Route exact path={`${props.base}/profile`}>
          <UserProfile />
        </Route>
        <Route exact path={`${props.base}/teams`}>
          <AllTeams />
        </Route>
        <Route exact path={`${props.base}`}>
          <Redirect to={`${props.base}/calendar`} />
        </Route>
      </Switch>
    </div>
  );
};

UserRouter.propTypes = {
  base: PropTypes.string,
};
