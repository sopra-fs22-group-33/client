import { Redirect, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import {TeamCalendar} from "components/views/Team/TeamCalendar";
import {TeamProfile} from "components/views/Team/TeamProfile";
import {AllTeams} from "../../views/Team/AllTeams";
import {TeamEdit} from "../../views/Team/TeamEdit";

export const TeamRouter = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path={`${props.base}/all`}>
          <AllTeams />
        </Route>
        <Route exact path={`${props.base}/calendar`}>
          <TeamCalendar />
        </Route>
        <Route exact path={`${props.base}/profile`}>
          <TeamProfile />
        </Route>
        <Route exact path={`${props.base}/edit`} >
          <TeamEdit />
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
