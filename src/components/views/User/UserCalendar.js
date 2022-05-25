import BaseContainer from "../../ui/BaseContainer";
import * as React from "react";
import { useEffect, useState } from "react";
import { fetchFixedUserCalendar } from "../../../helpers/api";
import { useHistory } from "react-router-dom";
import { Button } from "../../ui/Button";
import {
  insertFillerDays,
  validateUserCalendar,
} from "../../../helpers/validations";
import { CalendarNavigationButtons } from "../../ui/calendar/CalendarNavigationButtons";
import { FixedCalendar } from "../../ui/calendar/fixed/FixedCalendar";

export const UserCalendar = () => {
  const history = useHistory();
  const [calendar, setCalendar] = useState(null);
  const [localDays, setLocalDays] = useState([]);
  const [displayedWeekIdx, setDisplayedWeekIdx] = useState(0);

  const handleBack = () => {
    // go back one week
    if (displayedWeekIdx > 0) {
      setDisplayedWeekIdx(displayedWeekIdx - 1);
    } else {
      setDisplayedWeekIdx(Math.floor(localDays.length / 7 - 1));
    }
  };
  const handleForwards = () => {
    // go forwards one week
    if (displayedWeekIdx < localDays.length / 7 - 1) {
      setDisplayedWeekIdx(displayedWeekIdx + 1);
    } else {
      setDisplayedWeekIdx(0);
    }
  };

  useEffect(() => {
    fetchFixedUserCalendar(sessionStorage.getItem("id")).then((calendar) => {
      calendar = validateUserCalendar(calendar);
      setLocalDays(insertFillerDays(calendar.days, calendar.startingDate));
      setCalendar(calendar);
    });
  }, []);

  if (!calendar) {
    return <div>fetching calendar</div>;
  }

  return (
    <BaseContainer>
      <div className="navigation-button-container container">
        <div className="navigation-button-container title">
          <h1>User Calendar</h1>
        </div>
        {calendar.days.length > 0 ? (
          <CalendarNavigationButtons
            onBack={() => handleBack()}
            onForwards={() => handleForwards()}
          />
        ) : null}

        <div className="navigation-button-container button">
          <Button onClick={() => history.push("/user/calendar/edit")}>
            Edit Preferences
          </Button>
        </div>
      </div>
      <FixedCalendar
        startingDate={calendar.startingDate}
        type={"user"}
        days={localDays.slice(7 * displayedWeekIdx, 7 * (displayedWeekIdx + 1))}
      />
    </BaseContainer>
  );
};
