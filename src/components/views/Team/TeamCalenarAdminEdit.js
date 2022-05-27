import { useEffect, useState } from "react";
import { api, fetchTeamCalendar, handleError } from "../../../helpers/api";
import { validateTeamCalendar } from "../../../helpers/validations";
import { useHistory } from "react-router-dom";
import * as React from "react";
import BaseContainer from "../../ui/BaseContainer";
import { Button } from "../../ui/Button";
import { AdminCalendar } from "../../ui/calendar/admin/AdminCalendar";
import {
  mapCalendarToWeek,
  mapWeekToAdminCalendar,
} from "../../../helpers/calendarMappers";
import { CalendarDatePicker } from "../../ui/calendar/CalendarDatePicker";
import {StyledDialog} from "../../ui/StyledDialog";

export const TeamCalendarAdminEdit = () => {
  const history = useHistory();
  const [calendar, setCalendar] = useState(null);
  const [date, setDate] = useState(new Date());
  const [week, setWeek] = useState([]);

  const [isDeleting, setIsDeleting] = useState(false);

  async function doSave() {
    try {
      mapWeekToAdminCalendar(week, calendar.days);
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

      history.push("/team/calendar");
    } catch (error) {
      alert(
        `Something went wrong during saving the calendar: \n${handleError(
          error
        )}`
      );
    }
  }

  async function doDeleteFixedDays() {
    try {
      await api.delete(`teams/${sessionStorage.getItem("teamId")}/calendars`);
      history.push("/team/calendar");
    } catch (e) {
      alert(
        `Something went wrong while deleting the calendar: \n${handleError(e)}`
      );
    }
  }

  function handleDateChange(value) {
    calendar.startingDate = value;
    setCalendar(
      validateTeamCalendar(calendar)
    ); /* recalculates date for each day in calendar */
    setDate(value);
  }

  useEffect(() => {
    fetchTeamCalendar().then((calendar) => {
      calendar = validateTeamCalendar(calendar);
      setWeek(mapCalendarToWeek(calendar.days));
      setCalendar(calendar);
      setDate(new Date(calendar.startingDate));
    });
  }, []);

  if (!calendar) {
    return <div>fetching calendar</div>;
  }

  return (
    <div>
      <StyledDialog open={isDeleting}>
        <div>This will delete all assigned shifts,</div>
        <div>are you sure?</div>
        <Button
          onClick={() => {
            doDeleteFixedDays().then((r) => setIsDeleting(false));
          }}
        >
          yes
        </Button>
        <Button onClick={() => setIsDeleting(false)}>no</Button>
      </StyledDialog>
      <BaseContainer>
        <div className="navigation-button-container container">
          <div className="navigation-button-container title">
            <h1>Edit Calendar</h1>
          </div>
          <CalendarDatePicker
            value={date}
            onChange={(value) => handleDateChange(value)}
          />
          <div className="navigation-button-container button">
            <Button onClick={() => doSave()}>Save</Button>
            <Button onClick={() => history.push("/team/calendar")}>
              Cancel
            </Button>
          </div>
        </div>
        <AdminCalendar
          startingDate={calendar.startingDate.toLocaleString()}
          days={week}
        />
        <Button onClick={() => setIsDeleting(true)}>Delete Optimized Calendar</Button>
      </BaseContainer>
    </div>
  );
};