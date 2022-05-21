import { useHistory } from "react-router-dom";
import { api, fetchTeamCalendar, handleError } from "helpers/api";
import * as React from "react";
import { useEffect, useState } from "react";
import BaseContainer from "../../ui/BaseContainer";
import { EditChoiceButton } from "../../ui/calendar/EditChoiceButton";
import { Button } from "../../ui/Button";
import { Calendar } from "../../ui/calendar/Calendar";
import { Day, handleOverlap } from "../../ui/calendar/Day";
import { Slot } from "../../ui/calendar/Slot";
import { SlotPopper } from "../../ui/calendar/SlotPopper";
import { randomId } from "../../../helpers/validations";

export const TeamCalendar = () => {
  const history = useHistory();
  const [calendar, setCalendar] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [anchorEl, setAnchorEl] = useState(undefined);

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
            {sessionStorage.getItem("isAdmin") === "true" ? (
              <Button onClick={() => handleFinalize()}>Finalize</Button>
            ) : null}
            <EditChoiceButton />
          </div>
        </div>
        <Calendar>
          {calendar.days.map((day) => {
            day.slots = handleOverlap(day.slots);
            return (
              <Day key={day.id}>
                {day.slots.map((slot) => (
                  <Slot
                    key={slot.id}
                    sx={{ left: slot.left, width: slot.width }}
                    onMouseEnter={(ev) => {
                      setAnchorEl(ev.currentTarget);
                      setSelectedSlot(slot.id);
                    }}
                    onMouseLeave={(ev) => {
                      setAnchorEl(undefined);
                      setSelectedSlot(null);
                    }}
                    timeFrom={slot.timeFrom}
                    timeTo={slot.timeTo}
                  >
                    {anchorEl !== undefined && selectedSlot === slot.id ? (
                      <SlotPopper anchorEl={anchorEl}>
                        {
                          <div>
                            <div>requirement: {slot.requirement}</div>
                            <div>timeFrom: {slot.timeFrom}</div>
                            <div>timeTo: {slot.timeTo}</div>
                            {slot.schedules.map((schedule) => (
                              <ul key={randomId()}>
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
