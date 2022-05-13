import * as React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {api, fetchTeamCalendar, handleError} from "../../../helpers/api";
import { AdminCalendar } from "../../ui/calendar/admin/AdminCalendar";
import { validateTeamCalendar } from "../../../helpers/validations";
import { Button } from "../../ui/Button";
import BaseContainer from "../../ui/BaseContainer";
import { SpecialCalendar } from "../../ui/calendar/special/SpecialCalendar";
import { BaseCalendar } from "../../ui/calendar/base/BaseCalendar";
import { EditChoiceButton } from "../../ui/calendar/EditChoiceButton";

export const TeamCalendarEdit = () => {
  const history = useHistory();
  const [calendar, setCalendar] = useState(null);
  const [editing, setEditing] = useState(history.location.state.editing);

  async function doSave() {
    try {
      console.log(calendar);
      const requestBody = JSON.stringify({
        days: calendar.days,
        startingDate: calendar.startingDate,
      });
      await api.put(
        `/teams/${sessionStorage.getItem("teamId")}/calendars`,
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
    setCalendar(null); /* force reset calendar to newly fetched, otherwise incorrect calendar is edited */
    fetchTeamCalendar().then((data) => setCalendar(validateTeamCalendar(data)));
  }, [editing]);

  if (!calendar) {
    return <div>fetching calendar</div>;
  }

  let headerText = {};
  let content = {};
  switch (editing) {
    case "calendar":
      headerText = "Edit Team Calendar";
      content = (
        <AdminCalendar
          startingDate={calendar.startingDate}
          days={calendar.days}
        />
      );
      break;
    case "special":
      headerText = "Edit Special Preferences";
      content = (
        <SpecialCalendar
          startingDate={calendar.startingDate}
          days={calendar.days}
        />
      );
      break;
    case "base":
      headerText = "Edit Base Preferences";
      content = (
        <BaseCalendar
          startingDate={calendar.startingDate}
          days={calendar.days}
        />
      );
      break;
    default:
      headerText = editing.toString();
      content = <div> Something went wrong </div>;
  }

  return (
    <div>
      <BaseContainer>
        <div className="navigation-button-container container">
          <div className="navigation-button-container title">
            <h1>{headerText}</h1>
          </div>
          <div className="navigation-button-container button">
            <EditChoiceButton setEditing={(value) => setEditing(value)} />
            <Button onClick={() => doSave()}>Save</Button>
            <Button onClick={() => history.push("/team/calendar")}>
              Cancel
            </Button>
          </div>
        </div>
        {content}
      </BaseContainer>
    </div>
  );
};
