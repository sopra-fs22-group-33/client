import { useHistory } from "react-router-dom";
import { api, fetchTeamCalendar, handleError } from "helpers/api";
import * as React from "react";
import { useEffect, useState } from "react";
import BaseContainer from "../../ui/BaseContainer";
import { Button } from "../../ui/Button";
import { CalendarNavigationButtons } from "../../ui/calendar/CalendarNavigationButtons";
import { FixedCalendar } from "../../ui/calendar/fixed/FixedCalendar";
import {
  insertFillerDays,
  validateTeamCalendar,
} from "../../../helpers/validations";
import { SpecialCalendar } from "../../ui/calendar/special/SpecialCalendar";
import calendarEventDispatcher from "../../ui/calendar/calendarEventDispatcher";
import {countJokers} from "../../ui/calendar/Calendar";
import {MAX_JOKERS} from "../../ui/calendar/config";

export const TeamCalendar = () => {
  const history = useHistory();
  const [calendar, setCalendar] = useState(null);
  const [isFixed, setIsFixed] = useState(true);
  const [localDays, setLocalDays] = useState([]);
  const [displayedWeekIdx, setDisplayedWeekIdx] = useState(0);

  const handleChangeDayType = () => {
    // change days from editable to fixed and back
    if (isFixed) {
      setIsFixed(false);
      setLocalDays(insertFillerDays(calendar.days, calendar.startingDate));
    } else {
      setIsFixed(true);
      setLocalDays(
        insertFillerDays(calendar.daysFixed, calendar.startingDateFixed)
      );
    }
  };
  const handleBack = () => {
    // go back one week
    if (displayedWeekIdx > 0) {
      setDisplayedWeekIdx(displayedWeekIdx - 1);
    }
    // chane day type if necessary
    // stop when there are no days left
  };
  const handleForwards = () => {
    // go forwards one week
    if (displayedWeekIdx < localDays.length / 7 - 1) {
      setDisplayedWeekIdx(displayedWeekIdx + 1);
    }
    // chane day type if necessary
    // stop when there are no days left
  };

  async function doSaveJokers() {
    const diff = countJokers(calendar.days, parseInt(sessionStorage.getItem("id"))) - MAX_JOKERS;
    if (diff > 0) {
      alert(`too many jokers, please remove ${diff}`);
      return;
    }
    try {
      // fixed days are never edited from frontend
      const requestBody = JSON.stringify({
        days: calendar.days,
        startingDate: calendar.startingDate,
      });
      await api.put(
        `/teams/${sessionStorage.getItem("teamId")}/calendars`,
        requestBody,
        {
          headers: { token: sessionStorage.getItem("token") },
        }
      );
    } catch (error) {
      alert(
        `Something went wrong during saving the calendar: \n${handleError(
          error
        )}`
      );
    }
  }

  async function handleFinalize() {
    try {
      const response = await api.get(
        `/teams/${sessionStorage.getItem("teamId")}/calendars/finalize`
      );
      alert(response.data);
    } catch (e) {
      alert(
        `Something went wrong while finalizing the calendar:\n${handleError(e)}`
      );
    }
  }

  useEffect(() => {
    fetchTeamCalendar().then((calendar) => {
      calendar = validateTeamCalendar(calendar);
      setCalendar(calendar);
      if (isFixed) {
        setLocalDays(
          insertFillerDays(calendar.daysFixed, calendar.startingDateFixed)
        );
      } else {
        setLocalDays(insertFillerDays(calendar.days, calendar.startingDate));
      }
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
            <h1>Team Calendar</h1>
          </div>
          <CalendarNavigationButtons
            onBigBack={() => handleChangeDayType()}
            onBack={() => handleBack()}
            onForwards={() => handleForwards()}
            onBigForwards={() => handleChangeDayType()}
          />
          <div className="navigation-button-container button">
            {!isFixed ? <Button onClick={() => doSaveJokers()}> Save </Button> : null}
            {sessionStorage.getItem("isAdmin") === "true" ? (
              <Button onClick={() => handleFinalize()}>Finalize</Button>
            ) : null}
            {sessionStorage.getItem("isAdmin") === "true" ? (
              <Button onClick={() => history.push("/team/calendar/edit")}>
                Edit
              </Button>
            ) : null}
            <Button
              onClick={() => history.push("/team/calendar/edit/preferences")}
            >
              Preferences
            </Button>
          </div>
        </div>
        {isFixed ? (
          <FixedCalendar
            startingDate={
              isFixed ? calendar.startingDateFixed : calendar.startingDate
            }
            type={"team"}
            days={localDays.slice(
              7 * displayedWeekIdx,
              7 * (displayedWeekIdx + 1)
            )}
          />
        ) : (
          <SpecialCalendar
            startingDate={calendar.startingDate}
            days={localDays.slice(
              7 * displayedWeekIdx,
              7 * (displayedWeekIdx + 1)
            )}
            allDays={calendar.days}
          />
        )}
      </BaseContainer>
    </div>
  );
};
