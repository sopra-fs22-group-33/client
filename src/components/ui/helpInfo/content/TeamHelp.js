import teamCalendarPreferences from "../../../../images/helpScreenshots/teamCalendarPreferences.png";
import teamCalendarEdit from "../../../../images/helpScreenshots/teamCalendarEdit.png";
import teamCalendar from "../../../../images/helpScreenshots/teamCalendar.png";
import teamProfile from "../../../../images/helpScreenshots/teamProfile.png";

import { HelpInfoImageFrame } from "../HelpInfoImageFrame";

export const TeamCalendarEditPreferenceHelp = (
  <div>
    <div>
      Here you can fine-tune your preferred working hours for this specific team
    </div>
    <HelpInfoImageFrame src={teamCalendarPreferences} />
    <div>
      Keep in mind that these will be reset to the preferences in your profile
    </div>
    <div>whenever there is a change in the calendar</div>
  </div>
);

export const TeamCalendarEditHelp = (
  <div>
    <div>
      Here you can create new shifts, edit their times and number of people
      required
    </div>
    <div>as well as change the starting date of the optimized calendar</div>
    <HelpInfoImageFrame src={teamCalendarEdit} />
    <div>
      Here you can also delete the shifts that have already been assigned
    </div>
  </div>
);

export const TeamCalendarHelp = (
  <div>
    <div>
      Here is where you will see your team's calendar once the admin creates
      shifts and presses finalize
    </div>
    <div>
      By using the arrow-buttons you can navigate between weeks(single arrow)
      and calendar types (double arrows)
    </div>
    <div>
      the finalized calendar (dark blue) shows you who is assigned to what shift
    </div>
    <div>
      whilst the new calendar (light blue) allows you to place jokers on shifts
      where you have a specifically strong preference
    </div>
    <HelpInfoImageFrame src={teamCalendar} />
    <div>
      Keep in mind that jokers do not guarantee your preference is satisfied
    </div>
    <div>and that collisions in preference must be resolved via game</div>
  </div>
);

export const TeamProfileHelp = (
  <div>
    <div>
      Here you can invite people to join your team, provided they have an
      account
    </div>
    <div>You can also edit the name of your team,</div>
    <div>delete the entire team</div>
    <div>or remove specific people from the team</div>
    <HelpInfoImageFrame src={teamProfile} />
  </div>
);

