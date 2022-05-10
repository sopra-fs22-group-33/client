import { useHistory } from "react-router-dom";
import { fetchTeamCalendar } from "helpers/api";
import * as React from "react";
import { useEffect, useState } from "react";
import BaseContainer from "../../ui/BaseContainer";
import { EditChoiceButton } from "../../ui/calendar/EditChoiceButton";
import { Button } from "../../ui/Button";
import { Calendar } from "../../ui/calendar/Calendar";
import { Day, handleOverlap } from "../../ui/calendar/Day";
import { Slot } from "../../ui/calendar/Slot";

export const TeamCalendar = () => {
  const history = useHistory();
  const [calendar, setCalendar] = useState(null);

  useEffect(() => {
    fetchTeamCalendar().then((calendar) => setCalendar(calendar));
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
          <div className="navigation-button-container button">
            <EditChoiceButton />
            <Button onClick={() => history.push("/team/profile")}>
              Team Profile
            </Button>
          </div>
        </div>
        <Calendar>
          {calendar.days.map((day) => {
            day.slots = handleOverlap(day.slots);
            return (
              <Day >
                {day.slots.map((slot) => (
                  <Slot sx={{left: slot.left, width: slot.width}} timeFrom={slot.timeFrom} timeTo={slot.timeTo} />
                ))}
              </Day>
            );
          })}
        </Calendar>
      </BaseContainer>
    </div>
  );
};
