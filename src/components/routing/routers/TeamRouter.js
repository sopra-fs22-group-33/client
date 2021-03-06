import { Redirect, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { TeamCalendar } from "components/views/Team/TeamCalendar";
import { TeamProfile } from "components/views/Team/TeamProfile";
import { TeamProfileEdit } from "../../views/Team/TeamProfileEdit";
import { TeamInvite } from "../../views/Team/TeamInvite";
import { TeamCalendarAdminEdit } from "../../views/Team/TeamCalenarAdminEdit";
import { TeamCalendarPreferenceEdit } from "../../views/Team/TeamCalendarPreferenceEdit";

export const TeamRouter = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path={`${props.base}/calendar`}>
          <TeamCalendar />
        </Route>
        <Route exact path={`${props.base}/profile`}>
          <TeamProfile />
        </Route>
        <Route exact path={`${props.base}/calendar/edit`}>
          <TeamCalendarAdminEdit />
        </Route>
        <Route exact path={`${props.base}/calendar/edit/preferences`}>
          <TeamCalendarPreferenceEdit />
        </Route>
        <Route exact path={`${props.base}/profile/edit`}>
          <TeamProfileEdit />
        </Route>
        <Route exact path={`${props.base}/profile/invite`}>
          <TeamInvite />
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
