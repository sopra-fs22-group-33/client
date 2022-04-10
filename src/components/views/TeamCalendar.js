import { useHistory } from "react-router-dom";
import { doLogout } from "helpers/api";
import * as React from "react";
import { Calendar } from "components/ui/Calendar";
import {validateCalendar} from "helpers/validations";
import {VALID_TEAM_CALENDAR} from "fixtures/exampleCalendar";

export const TeamCalendar = () => {
  const history = useHistory();

  const validatedCalendar = validateCalendar(VALID_TEAM_CALENDAR);

  return (
    <div>
      <div>
        button container
        <button onClick={() => history.push("/team/profile")}>profile</button>
        <button onClick={() => history.push("/user")}>me</button>
        <button onClick={() => doLogout().then(() => history.push("/"))}>
          logout
        </button>
      </div>
      <div>
        calendar container
        <Calendar
          startingDate={validatedCalendar.startingDate}
          days={validatedCalendar.days}
        />
      </div>
    </div>
  );
};
