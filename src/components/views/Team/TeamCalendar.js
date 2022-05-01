import { useHistory } from "react-router-dom";
import { api, doLogout, handleError } from "helpers/api";
import * as React from "react";
import { Calendar } from "components/ui/calendar/Calendar";
import { validateCalendar } from "helpers/validations";
import { useEffect, useState } from "react";

export const TeamCalendar = () => {
  const history = useHistory();
  const [calendar, setCalendar] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(
          `/teams/${localStorage.getItem("teamId")}/calendars`
        );
        console.log(response.data);

        setCalendar(validateCalendar(response.data));
      } catch (e) {
        alert(`Something went wrong during fetching the calendar: \n${handleError(e)}`);
      }
    }

    fetchData();
  }, []);

  if (!calendar) {
    return (
        <div>
          fetching calendar
        </div>
    )
  }

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
        <button onClick={() => history.push("/team/calendar/edit")}>edit</button>
      </div>
      <div>
        calendar container
        <Calendar
          startingDate={calendar.startingDate}
          days={calendar.days}
        />
      </div>
    </div>
  );
};
