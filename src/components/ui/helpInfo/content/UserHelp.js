import edit from "../../../../images/helpScreenshots/userCalendarEdit.png";
import buttons1 from "../../../../images/helpScreenshots/userProfile1.png";
import buttons2 from "../../../../images/helpScreenshots/userProfile2.png";
import invitations from "../../../../images/helpScreenshots/userInvitations.png";
import calendar from "../../../../images/helpScreenshots/userCalendar.png";
import teams from "../../../../images/helpScreenshots/userTeams.png";
import { HelpInfoImageFrame } from "../HelpInfoImageFrame";

export const UserCalendarEditHelp = (
  <div>
    <div>
      Here you can set your preferences for different working hours on different
      weekdays
    </div>
    <HelpInfoImageFrame src={edit} />
    <div>
      Once you are part of a team, these will be mapped onto the schedules in
      that team's calendar
    </div>
  </div>
);

export const UserCalendarHelp = (
  <div>
    <div>Here you will see all of your shifts from different teams</div>
    <HelpInfoImageFrame src={calendar} />
    <div>
      you can navigate between weeks by pressing the left and right arrows at
      the top of the calendar
    </div>
  </div>
);

export const UserInvitationsHelp = (
  <div>
    <div>
      Once you are invited to a team by team administrator this is where you
      will be able to accept or decline the invitation
    </div>
    <HelpInfoImageFrame src={invitations} />
  </div>
);

export const UserProfileHelp = (
  <div>
    <div>
      Here you can see your profile as well as change your password, username
      and email
    </div>
    <HelpInfoImageFrame src={buttons1} />
    <div>
      From here you will also find any invitations to teams created by other
      people
    </div>
    <HelpInfoImageFrame src={buttons2} />
  </div>
);

export const UserTeamsHelp = (
  <div>
    <div>
      Here you can see all of the teams you are part of as well as create new
      ones
    </div>
    <HelpInfoImageFrame src={teams} />
    <div>
      In order to view the profile and calendar of a specific team you must
      first press on it
    </div>
    <div>and then navigate to Team Calendar using the menu on the right</div>
  </div>
);
