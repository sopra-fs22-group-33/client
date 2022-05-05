import * as React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, handleError } from "../../../helpers/api";
import { AdminCalendar } from "../../ui/calendar/AdminCalendar";
import { validateCalendar } from "../../../helpers/validations";
import {Button} from "../../ui/Button";
import BaseContainer from "../../ui/BaseContainer";

export const TeamCalendarEdit = () => {
  const history = useHistory();
  const [calendar, setCalendar] = useState(null);

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

      history.push("/team/calendar");
    } catch (error) {
      alert(
        `Something went wrong during saving the calendar: \n${handleError(
          error
        )}`
      );
    }
  }

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

  if (!calendar) {
    return <div>fetching calendar</div>;
  }

  return (
    <div>
      <BaseContainer>
        <div className="navigation-button-container container">
          <div className="navigation-button-container title">
            <h1>Edit Team Calendar</h1>
          </div>
          <div className="navigation-button-container button">
            <Button onClick={() => doSave()}>Save</Button>
            <Button onClick={() => history.push("/team/calendar")}>Cancel</Button>          </div>
        </div>
        <AdminCalendar startingDate={calendar.startingDate} days={calendar.days} />
      </BaseContainer>
    </div>
  );
};
