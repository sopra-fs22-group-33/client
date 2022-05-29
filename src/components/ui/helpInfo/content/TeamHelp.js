import teamCalendarPreferences from "../../../../images/helpScreenshots/teamCalendarPreferences.png";
import teamCalendarEdit from "../../../../images/helpScreenshots/teamCalendarEdit.png";
import teamCalendar from "../../../../images/helpScreenshots/teamCalendar.png";
import teamProfile from "../../../../images/helpScreenshots/teamProfile.png";

import { HelpInfoImageFrame } from "../HelpInfoImageFrame";

export const TeamCalendarEditPreferenceHelp = (
  <div>
    <p>
      Here you can fine-tune your preferred working hours for this specific team
    </p>
    <HelpInfoImageFrame src={teamCalendarPreferences} />
    <p>
      Keep in mind that these will be reset to the preferences in your profile
      whenever there is a change in the calendar
    </p>
  </div>
);

export const TeamCalendarEditHelp = (
  <div>
    <p>
      Here you can create new shifts, edit their times and number of people
      required as well as change the starting date of the optimized calendar.
    </p>
    <HelpInfoImageFrame src={teamCalendarEdit} />
    <div>
      Here you can also delete the shifts that have already been assigned
    </div>
  </div>
);

export const TeamCalendarHelp = (
  <div>
    <p>
      Here is where you will see your team's calendar once the admin creates
      shifts and presses finalize.
    </p>
    <p>
      By using the arrow-buttons you can navigate between weeks(single arrow)
      and calendar types (double arrows).
    </p>
    <p>
      The finalized calendar (dark blue) shows you who is assigned to what
      shift.
    </p>
    <p>
      Whilst the new calendar (light blue) allows you to place jokers on shifts
      where you have a specifically strong preference.
    </p>
    <HelpInfoImageFrame src={teamCalendar} />
    <p>
      Keep in mind that jokers do not guarantee your preference is satisfied and
      that collisions in preference must be resolved via game.
    </p>
  </div>
);

export const TeamProfileHelp = (
  <div>
    <p>
      Here you can invite people to join your team, provided they have an
      account. You can also edit the name of your team, delete the entire team
      or remove specific people from the team.
    </p>
    <HelpInfoImageFrame src={teamProfile} />
  </div>
);

