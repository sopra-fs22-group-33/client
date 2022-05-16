import { Redirect, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { UserCalendar } from "components/views/User/UserCalendar";
import { UserProfile } from "components/views/User/UserProfile";
import { AllTeams } from "../../views/User/AllTeams";
import {CreateTeam} from "../../views/User/CreateTeam";
import {UserInvitations} from "../../views/User/UserInvitations";
import UserProfileEdit from "../../views/User/UserProfileEdit";
import {UserCalendarEdit} from "../../views/User/UserCalendarEdit";

export const UserRouter = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path={`${props.base}/calendar`}>
          <UserCalendar />
        </Route>
        <Route exact path={`${props.base}/calendar/edit`}>
          <UserCalendarEdit />
        </Route>
        <Route exact path={`${props.base}/profile`}>
          <UserProfile />
        </Route>
        <Route exact path={`${props.base}/profile/edit`}>
          <UserProfileEdit />
        </Route>
        <Route exact path={`${props.base}/profile/invitations`} >
          <UserInvitations />
        </Route>
        <Route exact path={`${props.base}/teams`}>
          <AllTeams />
        </Route>
        <Route exact path={`${props.base}/create`}>
          <CreateTeam />
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
