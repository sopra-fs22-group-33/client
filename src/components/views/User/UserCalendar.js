import BaseContainer from "../../ui/BaseContainer";
import { Day, handleOverlap } from "../../ui/calendar/Day";
import { Slot } from "../../ui/calendar/Slot";
import { SlotPopper } from "../../ui/calendar/SlotPopper";
import { Calendar } from "../../ui/calendar/Calendar";
import * as React from "react";
import { useEffect, useState } from "react";
import { fetchFixedUserCalendar } from "../../../helpers/api";
import { useHistory } from "react-router-dom";
import { Button } from "../../ui/Button";
import { validateUserCalendar } from "../../../helpers/validations";
import { CalendarNavigationButtons } from "../../ui/calendar/CalendarNavigationButtons";
import { FixedCalendar } from "../../ui/calendar/fixed/FixedCalendar";

export const UserCalendar = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(undefined);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [calendar, setCalendar] = useState(null);

  const handleBack = () => {
    // go back one week
    // chane day type if necessary
    // stop when there are no days left
  };
  const handleForwards = () => {
    // go forwards one week
    // chane day type if necessary
    // stop when there are no days left
  };

  useEffect(() => {
    fetchFixedUserCalendar(sessionStorage.getItem("id")).then((calendar) =>
      setCalendar(validateUserCalendar(calendar))
    );
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
        <CalendarNavigationButtons
          onBack={() => handleBack()}
          onForwards={() => handleForwards()}
        />
        <div className="navigation-button-container button">
          <Button onClick={() => history.push("/user/calendar/edit")}>
            Edit Preferences
          </Button>
        </div>
      </div>
      <FixedCalendar
        startingDate={calendar.startingDate}
        type={"user"}
        days={calendar.days}
      />
    </BaseContainer>
  );
};
