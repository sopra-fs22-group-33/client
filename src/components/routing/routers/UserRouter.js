import { Redirect, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { UserCalendar } from "components/views/UserCalendar";
import { UserProfile } from "components/views/UserProfile";

export const UserRouter = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path={`${props.base}/calendar`}>
          <UserCalendar />
        </Route>
        <Route exact path={`${props.base}`}>
          <Redirect to={`${props.base}/calendar`} />
        </Route>
        <Route exact path={`${props.base}/profile`}>
          <UserProfile />
        </Route>
      </Switch>
    </div>
  );
};

UserRouter.propTypes = {
  base: PropTypes.string,
};
