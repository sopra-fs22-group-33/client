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
import { SlotPopper } from "../../ui/calendar/SlotPopper";

export const TeamCalendar = () => {
  const history = useHistory();
  const [calendar, setCalendar] = useState(null);
  const [anchorEl, setAnchorEl] = useState(undefined);

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
              <Day>
                {day.slots.map((slot) => (
                  <Slot
                    sx={{ left: slot.left, width: slot.width }}
                    onMouseEnter={(ev) => setAnchorEl(ev.currentTarget)}
                    onMouseLeave={(ev) => setAnchorEl(undefined)}
                    timeFrom={slot.timeFrom}
                    timeTo={slot.timeTo}
                  >
                    {anchorEl ? (
                      <SlotPopper anchorEl={anchorEl}>
                        {
                          <div>
                            <div>requirement: {slot.requirement}</div>
                            <div>
                              timeFrom:{" "}
                              {slot.timeFrom /*temporary, for easier styling */}
                            </div>
                            <div>
                              timeTo:{" "}
                              {slot.timeTo /*temporary, for easier styling */}
                            </div>
                            {slot.schedules.map((schedule) => (
                              <ul>
                                <div>email: {schedule.user.email}</div>
                                <div>base: {schedule.base}</div>
                                <div>special: {schedule.special}</div>
                                <div>assigned: {schedule.assigned}</div>
                              </ul>
                            ))}
                          </div>
                        }
                      </SlotPopper>
                    ) : null}
                  </Slot>
                ))}
              </Day>
            );
          })}
        </Calendar>
      </BaseContainer>
    </div>
  );
};
