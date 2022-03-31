import { Redirect, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { PersonalCalendar } from "components/views/PersonalCalendar";

export const UserRouter = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path={`${props.base}/calendar`}>
          <PersonalCalendar />
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
