import { useEffect, useState } from "react";
import { api, fetchTeamCalendar, handleError } from "../../../helpers/api";
import { validateTeamCalendar } from "../../../helpers/validations";
import { useHistory } from "react-router-dom";
import BaseContainer from "../../ui/BaseContainer";
import { Button } from "../../ui/Button";
import * as React from "react";
import { BaseCalendar } from "../../ui/calendar/base/BaseCalendar";
import {
  mapCalendarToWeek,
  mapWeekToPreferenceCalendar,
} from "../../../helpers/calendarMappers";

export const TeamCalendarPreferenceEdit = () => {
  const history = useHistory();
  const [calendar, setCalendar] = useState(null);
  const [week, setWeek] = useState([]);

  async function doSave() {
    try {
      mapWeekToPreferenceCalendar(week, calendar.days);
      const requestBody = JSON.stringify({
        days: calendar.days,
        startingDate: calendar.startingDate,
      });
      await api.put(
        `/teams/${sessionStorage.getItem(
          "teamId"
        )}/calendars/${sessionStorage.getItem("id")}`,
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
      setWeek(mapCalendarToWeek(calendar.days));
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
            <h1>Edit Preferences</h1>
          </div>
          <div className="navigation-button-container button">
            <Button onClick={() => doSave()}>Save</Button>
            <Button onClick={() => history.push("/team/calendar")}>
              Cancel
            </Button>
          </div>
        </div>
        <BaseCalendar startingDate={calendar.startingDate} days={week} />
      </BaseContainer>
    </div>
  );
};
