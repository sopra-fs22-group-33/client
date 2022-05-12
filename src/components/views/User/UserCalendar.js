import BaseContainer from "../../ui/BaseContainer";
import { Day, handleOverlap } from "../../ui/calendar/Day";
import { Slot } from "../../ui/calendar/Slot";
import { SlotPopper } from "../../ui/calendar/SlotPopper";
import { Calendar } from "../../ui/calendar/Calendar";
import * as React from "react";
import { useEffect, useState } from "react";
import { fetchFixedUserCalendar } from "../../../helpers/api";
import {useHistory} from "react-router-dom";
import {Button} from "../../ui/Button";

export const UserCalendar = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(undefined);
  const [calendar, setCalendar] = useState(null);

  useEffect(() => {
    fetchFixedUserCalendar(sessionStorage.getItem("id")).then((calendar) =>
      setCalendar(calendar)
    );
  }, []);

  let content = <div> fetching user calendar </div>;
  if (calendar) {
    content = (
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
                          <div>timeFrom: {slot.timeFrom}</div>
                          <div>timeTo: {slot.timeTo}</div>
                          {slot.schedules
                            ? slot.schedules.map((schedule) => (
                                <ul>
                                  <div>email: {schedule.user.email}</div>
                                  <div>base: {schedule.base}</div>
                                  <div>special: {schedule.special}</div>
                                  <div>assigned: {schedule.assigned}</div>
                                </ul>
                              ))
                            : null}
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
    );
  }

  return (
    <BaseContainer>
      <div className="navigation-button-container container">
        <div className="navigation-button-container title">
          <h1>User Calendar</h1>
        </div>
        <div className="navigation-button-container button">
          <Button onClick={() => history.push("/user/calendar/edit")}>Edit Preferences</Button>
        </div>
      </div>
      {content}
    </BaseContainer>
  );
};
