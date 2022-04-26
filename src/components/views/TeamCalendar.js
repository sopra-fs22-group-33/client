import { useHistory } from "react-router-dom";
import { api, doLogout, handleError } from "helpers/api";
import * as React from "react";
import { Calendar } from "components/ui/calendar/Calendar";
import { validateCalendar } from "helpers/validations";
import { VALID_TEAM_CALENDAR } from "fixtures/exampleCalendar";
import { useEffect, useState } from "react";

export const TeamCalendar = () => {
  const history = useHistory();
  const [calendar, setCalendar] = useState(VALID_TEAM_CALENDAR);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(
          `/teams/${localStorage.getItem("teamId")}/calendars`
        );

        setCalendar(response.data);
      } catch (e) {
        alert(`Something went wrong during the login: \n${handleError(e)}`);
      }
    }

    fetchData();
  }, []);

  const validatedCalendar = validateCalendar(calendar);

  return (
    <div>
      <div>
        main button container
        <button onClick={() => history.push("/team/profile")}>profile</button>
        <button onClick={() => history.push("/user")}>me</button>
        <button onClick={() => doLogout().then(() => history.push("/"))}>
          logout
        </button>
      </div>
      <div>
        special button container
        <button onClick={() => history.push("/team/edit")}>edit</button>
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
