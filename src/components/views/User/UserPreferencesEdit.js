import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  api,
  fetchEditableUserCalendar,
  handleError,
} from "../../../helpers/api";
import { Button } from "../../ui/Button";
import BaseContainer from "../../ui/BaseContainer";
import * as React from "react";
import { TEMPLATE_USER_CALENDAR } from "../../../fixtures/templateUserCalendar";
import { validateUserCalendar } from "../../../helpers/validations";
import { PreferenceCalendar } from "../../ui/calendar/base/PreferenceCalendar";
import {someMonday} from "../../../helpers/calendarMappers";

export const UserPreferencesEdit = () => {
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
        requestBody,
        { headers: { token: sessionStorage.getItem("token") } }
      );
    } catch (e) {
      alert(
        `Something went wrong while saving the calendar: \n${handleError(e)}`
      );
    }
  }

  function handleClick() {
    setCalendar(
      validateUserCalendar(JSON.parse(JSON.stringify(TEMPLATE_USER_CALENDAR)))
    );
  }

  useEffect(() => {
    fetchEditableUserCalendar(sessionStorage.getItem("id")).then((calendar) => {
      calendar.startingDate = someMonday;
      setCalendar(validateUserCalendar(calendar));
    });
  }, []);

  return (
    <BaseContainer>
      <div className="navigation-button-container container">
        <div className="navigation-button-container title">
          <h1>User Calendar</h1>
        </div>
        <div className="navigation-button-container button">
          <Button onClick={handleClick}>Load Template</Button>
          <Button
            onClick={() => doSave().then(() => history.push("/user/calendar"))}
          >
            Save
          </Button>
          <Button onClick={() => history.push("/user/calendar")}>Cancel</Button>
        </div>
      </div>
      {calendar ? (
        <PreferenceCalendar
          startingDate={TEMPLATE_USER_CALENDAR.startingDate}
          days={calendar.days}
        />
      ) : (
        <div> fetching editable calendar </div>
      )}
    </BaseContainer>
  );
};