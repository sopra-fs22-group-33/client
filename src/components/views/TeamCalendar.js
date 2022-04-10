import { useHistory } from "react-router-dom";
import { doLogout } from "helpers/api";
import * as React from "react";
import { Calendar } from "components/ui/Calendar";
import {EXAMPLE_VALIDATED_CALENDAR} from "../../fixtures/exampleCalendar";


export const TeamCalendar = () => {
  const history = useHistory();

    /**
     * validates a calendar, tries to get relevant data on assignedUsers
     *
     * @param {object} calendar
     * @returns {{startingDate: string, days: array}}
     */
  function validateCalendar(calendar) {
      let validatedCalendar = EXAMPLE_VALIDATED_CALENDAR;
      return validatedCalendar;
  }

  const validatedCalendar = validateCalendar({});

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
        <Calendar startingDate={validatedCalendar.startingDate} days={validatedCalendar.days} />
      </div>
    </div>
  );
};
