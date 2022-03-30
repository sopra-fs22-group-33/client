import { Redirect, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { PersonalCalendar } from "components/views/PersonalCalendar";

export const MainRouter = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path={`${props.base}/personal`}>
          <PersonalCalendar />
        </Route>
        <Route exact path={props.base}>
          <Redirect to={`${props.base}/personal`} />
        </Route>
      </Switch>
    </div>
  );
};

MainRouter.propTypes = {
  base: PropTypes.string,
};
