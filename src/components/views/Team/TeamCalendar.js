import { useHistory } from "react-router-dom";
import { api, doLogout, handleError } from "helpers/api";
import * as React from "react";
import { validateCalendar } from "helpers/validations";
import { useEffect, useState } from "react";
import { MemberCalendar } from "../../ui/calendar/MemberCalendar";

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
        alert(
          `Something went wrong during fetching the calendar: \n${handleError(
            e
          )}`
        );
      }
    }

    fetchData();
  }, []);

  async function doSave() {
    try {
      const requestBody = JSON.stringify({
        days: calendar.days,
        startingDate: calendar.startingDate,
      });
      await api.put(
        `/teams/${localStorage.getItem("teamId")}/calendars`,
        requestBody
      );

      alert("Saved successfully");
    } catch (error) {
      alert(
        `Something went wrong during saving the calendar: \n${handleError(
          error
        )}`
      );
    }
  }

  if (!calendar) {
    return <div>fetching calendar</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => history.push("/team/profile")}>profile</button>
        <button onClick={() => history.push("/user")}>me</button>
        <button onClick={() => doLogout().then(() => history.push("/"))}>
          logout
        </button>
      </div>
      <div>
        <button onClick={() => history.push("/team/calendar/edit")}>
          edit
        </button>
        <button onClick={() => doSave()}>save</button>
      </div>
      <div>
        <MemberCalendar
          startingDate={calendar.startingDate}
          days={calendar.days}
        />
      </div>
    </div>
  );
};
