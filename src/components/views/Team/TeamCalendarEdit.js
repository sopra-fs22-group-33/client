import * as React from "react";
import { useHistory } from "react-router-dom";
import {useEffect, useState} from "react";
import {api, handleError} from "../../../helpers/api";
import {Calendar} from "../../ui/calendar/Calendar";
import {validateCalendar} from "../../../helpers/validations";

export const TeamCalendarEdit = () => {
  const history = useHistory();
  const [calendar, setCalendar] = useState(null);

  async function doSave() {
    try {
      const requestBody = JSON.stringify({ calendar });
      await api.put(`/teams/${localStorage.getItem("teamId")}/calendars`, requestBody);

      history.push("/team/calendar");
    } catch (error) {
      alert(`Something went wrong during saving the calendar: \n${handleError(error)}`);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(
          `/teams/${localStorage.getItem("teamId")}/calendars`
        );
        console.log(response.data);

        setCalendar(response.data);
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

  let validatedCalendar = validateCalendar(calendar);

  return (
    <div>
      <div>
        button container
        <button onClick={() => doSave()}>save</button>
        <button onClick={() => history.push("/team/calendar")}>cancel</button>
      </div>
      <Calendar
          startingDate={validatedCalendar.startingDate}
          days={validatedCalendar.days}
        />
    </div>
  );
};
