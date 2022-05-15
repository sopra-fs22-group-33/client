export function randomId() {
  return window.crypto.getRandomValues(new Uint32Array(1))[0];
}

function wrappedCalendarError(message, o) {
  alert(`Invalid calendar ${message}\n ${JSON.stringify(o)}`);
  throw Error(`Invalid calendar ${message}\n ${JSON.stringify(o)}`);
}

/**
 * Validates a calendar and tries to get relevant data on assignedUsers if present
 *
 * @param {object} calendar
 * @throws Error
 * @returns {{startingDate: string, days: array}}
 */
export function validateTeamCalendar(calendar) {
  if (
    !calendar.hasOwnProperty("days") ||
    !Array.isArray(calendar.days) ||
    calendar.days.length === 0
  ) {
    wrappedCalendarError("invalid 'days' in teamCalendar:", calendar);
  }
  if (!calendar.hasOwnProperty("startingDate")) {
    wrappedCalendarError("invalid 'startingDate' in teamCalendar:", calendar);
  }

  for (let i in calendar.days) {
    let day = calendar.days[i];
    if (!day.hasOwnProperty("weekday")) {
      wrappedCalendarError("missing 'weekday' in teamCalendar:", day);
    }
    if (!day.hasOwnProperty("slots") || !Array.isArray(day.slots)) {
      day.slots = [];
    }

    day.id = day.id ? day.id : randomId();

    for (let i in day.slots) {
      let slot = day.slots[i];
      if (
        !slot.hasOwnProperty("timeFrom") ||
        typeof slot.timeFrom !== "number"
      ) {
        wrappedCalendarError("invalid 'timeFrom' in teamCalendar:", slot);
      }
      if (!slot.hasOwnProperty("timeTo") || typeof slot.timeTo !== "number") {
        wrappedCalendarError("invalid 'timeFrom' in teamCalendar:", slot);
      }
      if (!slot.hasOwnProperty("requirement")) {
        slot.requirement = 1;
      }
      if (!slot.hasOwnProperty("schedules")) {
        slot.schedules = [];
      }

      for (let i in slot.schedules) {
        let schedule = slot.schedules[i];

        if (!schedule.hasOwnProperty("special")) {
          schedule.special = -1;
        }
        if (!schedule.hasOwnProperty("base")) {
          schedule.base = 0;
        }
      }

      slot.id = slot.id ? slot.id : randomId();
    }
  }

  return calendar;
}

export function validateUserCalendar(calendar) {
  if (!calendar.hasOwnProperty("days")) {
    wrappedCalendarError("invalid 'days' in userCalendar:", calendar);
  }
  if (calendar.days === null) {
    calendar.days = [];
  }

  let d, day;
  let s, slot;
  // generate IDs if missing
  for (d in calendar.days) {
    day = calendar.days[d];
    day.id = day.id ? day.id : randomId();
      for (s in day.slots) {
        slot = day.slots[s];
        slot.id = slot.id ? slot.id : randomId();
      }
  }

  if (!calendar.hasOwnProperty("startingDate")) {
    wrappedCalendarError("invalid 'startingDate' in userCalendar:", calendar);
  }
  return calendar;
}
