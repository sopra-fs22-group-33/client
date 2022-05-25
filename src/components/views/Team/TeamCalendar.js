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

export const TeamCalendar = () => {
  const history = useHistory();
  const [calendar, setCalendar] = useState(null);
  const [isFixed, setIsFixed] = useState(true);
  const [localDays, setLocalDays] = useState([]);
  const [displayedWeekIdx, setDisplayedWeekIdx] = useState(0);

  const handleChangeDayType = () => {
    if (isFixed) {
      setIsFixed(false);
      setDisplayedWeekIdx(0);
      setLocalDays(insertFillerDays(calendar.days, calendar.startingDate));
    } else {
      setIsFixed(true);
      setDisplayedWeekIdx(0);
      setLocalDays(
        insertFillerDays(calendar.daysFixed, calendar.startingDateFixed)
      );
    }
  };
  const handleBack = () => {
    // go back one week
    if (displayedWeekIdx > 0) {
      setDisplayedWeekIdx(displayedWeekIdx - 1);
    } else {
      setDisplayedWeekIdx(Math.ceil(localDays.length / 7 - 1));
    }
  };
  const handleForwards = () => {
    // go forwards one week
    if (displayedWeekIdx < localDays.length / 7 - 1) {
      setDisplayedWeekIdx(displayedWeekIdx + 1);
    } else {
      handleChangeDayType();
    }
  };

  async function handleFinalize() {
    try {
      const response = await api.get(
        `/teams/${sessionStorage.getItem("teamId")}/calendars/finalize`
      );
      alert(response.data);
      setIsFixed(null);
      setIsFixed(true);
    } catch (e) {
      alert(
        `Something went wrong while finalizing the calendar:\n${handleError(e)}`
      );
    }
  }

  useEffect(() => {
    console.log("refetched");
    fetchTeamCalendar().then((calendar) => {
      calendar = validateTeamCalendar(calendar);

      // reset calendar components
      setCalendar(null);
      setLocalDays([]);

      setCalendar(calendar);
      if (isFixed) {
        setLocalDays(
          insertFillerDays(calendar.daysFixed, calendar.startingDateFixed)
        );
      } else {
        setLocalDays(insertFillerDays(calendar.days, calendar.startingDate));
      }
    });
  }, [isFixed]);

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
            startingDate={calendar.startingDateFixed}
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
