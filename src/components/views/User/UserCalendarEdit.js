import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  api,
  fetchEditableUserCalendar,
  handleError,
} from "../../../helpers/api";
import { BaseCalendar } from "../../ui/calendar/base/BaseCalendar";
import { Button } from "../../ui/Button";
import BaseContainer from "../../ui/BaseContainer";
import * as React from "react";
import { TEMPLATE_USER_CALENDAR } from "../../../fixtures/templateUserCalendar";
import { validateTeamCalendar } from "../../../helpers/validations";

export const UserCalendarEdit = () => {
  const history = useHistory();
  const [calendar, setCalendar] = useState(null);

  async function doSave() {
    try {
      const requestBody = JSON.stringify({
        days: calendar.days,
        startingDate: calendar.startingDate,
      });
      await api.put(
        `/users/${sessionStorage.getItem("id")}/preferences`,
        requestBody
      );
    } catch (e) {
      alert(
        `Something went wrong while saving the calendar: \n${handleError(e)}`
      );
    }
  }

  useEffect(() => {
    fetchEditableUserCalendar(sessionStorage.getItem("id")).then((calendar) =>
      setCalendar(calendar)
    );
  }, []);

  let content = <div> fetching editable calendar </div>;
  if (calendar) {
    content = (
      <BaseCalendar startingDate={calendar.startingDate} days={calendar.days} />
    );
  }

  return (
    <BaseContainer>
      <div className="navigation-button-container container">
        <div className="navigation-button-container title">
          <h1>User Calendar</h1>
        </div>
        <div className="navigation-button-container button">
          <Button
            onClick={() =>
              setCalendar(validateTeamCalendar(TEMPLATE_USER_CALENDAR))
            }
          >
            Load Template
          </Button>
          <Button
            onClick={() => doSave().then(() => history.push("/user/calendar"))}
          >
            Save
          </Button>
          <Button onClick={() => history.push("/user/calendar")}>Cancel</Button>
        </div>
      </div>
      {content}
    </BaseContainer>
  );
};