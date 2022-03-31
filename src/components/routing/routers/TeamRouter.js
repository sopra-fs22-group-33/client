import { Redirect, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import {TeamCalendar} from "components/views/TeamCalendar";

export const TeamRouter = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path={`${props.base}/calendar`}>
          <TeamCalendar />
        </Route>
        <Route exact path={`${props.base}`}>
          <Redirect to={`${props.base}/calendar`} />
        </Route>
      </Switch>
    </div>
  );
};

TeamRouter.propTypes = {
  base: PropTypes.string,
};
