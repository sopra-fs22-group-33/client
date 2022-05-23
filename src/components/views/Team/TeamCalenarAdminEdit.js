import { useEffect, useState } from "react";
import { api, fetchTeamCalendar, handleError } from "../../../helpers/api";
import {
  insertFillerDays,
  validateTeamCalendar,
} from "../../../helpers/validations";
import { useHistory } from "react-router-dom";
import * as React from "react";
import BaseContainer from "../../ui/BaseContainer";
import { Button } from "../../ui/Button";
import { AdminCalendar } from "../../ui/calendar/admin/AdminCalendar";

export const TeamCalendarAdminEdit = () => {
  const history = useHistory();
  const [calendar, setCalendar] = useState(null);
  const [localDays, setLocalDays] = useState([]);

  async function doSave() {
    try {
      const requestBody = JSON.stringify({
        days: calendar.days,
        startingDate: calendar.startingDate,
      });
      await api.put(
        `/teams/${sessionStorage.getItem("teamId")}/calendars/admin`,
        requestBody,
        {
          headers: { token: sessionStorage.getItem("token") },
        }
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
    fetchTeamCalendar().then((calendar) => {
      calendar = validateTeamCalendar(calendar);
      setLocalDays(insertFillerDays(calendar.days, calendar.startingDate));
      setCalendar(calendar);
    });
  }, []);

  if (!calendar) {
    return <div>fetching calendar</div>;
  }

  return (
    <div>
      <BaseContainer>
        <div className="navigation-button-container container">
          <div className="navigation-button-container title">
            <h1>Edit Calendar</h1>
          </div>
          <div className="navigation-button-container button">
            <Button onClick={() => doSave()}>Save</Button>
            <Button onClick={() => history.push("/team/calendar")}>
              Cancel
            </Button>
          </div>
        </div>
        <AdminCalendar startingDate={calendar.startingDate} days={localDays} />
      </BaseContainer>
    </div>
  );
};