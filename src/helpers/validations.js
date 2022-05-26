export function randomId() {
  return window.crypto.getRandomValues(new Uint32Array(1))[0];
}

function wrappedCalendarError(message, o) {
  alert(`Invalid calendar ${message}\n ${JSON.stringify(o)}`);
  throw Error(`Invalid calendar ${message}\n ${JSON.stringify(o)}`);
}

/**
 * Validates a team calendar
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

  if (!calendar.hasOwnProperty("daysFixed")) {
    wrappedCalendarError("invalid 'daysFixed' in teamCalendar:", calendar);
  }
  if (!calendar.hasOwnProperty("startingDateFixed")) {
    wrappedCalendarError(
      "invalid 'startingDateFixed' in teamCalendar:",
      calendar
    );
  }
  if (calendar.daysFixed === null) {
    calendar.daysFixed = [];
  }
  if (calendar.startingDateFixed === null) {
    calendar.startingDateFixed = calendar.startingDate;
  }

  for (let i in calendar.days) {
    let day = calendar.days[i];
    if (!day.hasOwnProperty("weekday")) {
      wrappedCalendarError("missing 'weekday' in teamCalendar:", day);
    }
    if (!day.hasOwnProperty("slots") || !Array.isArray(day.slots)) {
      day.slots = [];
    }

    day.id = day.id ? day.id : randomId(); /* generate if missing */
    day.date = getDate(day.weekday, calendar.startingDate);

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

  for (let i in calendar.daysFixed) {
    let day = calendar.daysFixed[i];
    if (!day.hasOwnProperty("weekday")) {
      wrappedCalendarError("missing 'weekday' in teamCalendar:", day);
    }
    if (!day.hasOwnProperty("slots") || !Array.isArray(day.slots)) {
      day.slots = [];
    }

    day.id = day.id ? day.id : randomId(); /* generate if missing */
    day.date = getDate(day.weekday, calendar.startingDateFixed);
  }

  return calendar;
}

/**
 * Validates a user calendar
 *
 * @param {object} calendar
 * @throws Error
 * @returns {{startingDate: string, days: array}}
 */
export function validateUserCalendar(calendar) {
  if (!calendar.hasOwnProperty("startingDate")) {
    wrappedCalendarError("invalid 'startingDate' in userCalendar:", calendar);
  }

  if (!calendar.hasOwnProperty("days")) {
    wrappedCalendarError("invalid 'days' in userCalendar:", calendar);
  }
  if (calendar.days === null) {
    calendar.days = [];
  }

  let d, day;
  let s, slot;

  for (d in calendar.days) {
    day = calendar.days[d];

    day.id = day.id ? day.id : randomId(); /* generate if missing */
    day.date = getDate(day.weekday, calendar.startingDate);

    for (s in day.slots) {
      slot = day.slots[s];
      slot.id = slot.id ? slot.id : randomId();
    }
  }
  return calendar;
}

export function sortUserCalendar(days, startingDateString) {
  days = days.sort((a, b) => a.weekday > b.weekday ? 1: -1);
  console.log(days);
}

export function insertFillerDays(days, startingDateString) {
  if (days.length === 0) {
    return [];
  }
  const originalDate = new Date(Date.parse(startingDateString));

  let mockDay;
  if (days[0].weekday > 0) {
    const localDate = new Date(days[0].date);
    let dayDiff = 0;
    while (localDate.getDay() !== 1 /* Monday */) {
      dayDiff--;
      localDate.setDate(localDate.getDate() - 1);
      if (dayDiff < -10) {
        // just in case something goes wrong
        break;
      }
    }

    localDate.setDate(localDate.getDate() - 1);
    mockDay = { weekday: days[0].weekday + dayDiff - 1, date: localDate };

  } else if (originalDate.getDay() !== 1) {
    const localDate = new Date(Date.parse(startingDateString));
    let dayDiff = 0;
    while (localDate.getDay() !== 1 /* Monday */) {
      dayDiff--;
      localDate.setDate(localDate.getDate() - 1);
      if (dayDiff < -10) {
        // just in case something goes wrong
        break;
      }
    }

    localDate.setDate(localDate.getDate() - 1);
    mockDay = { weekday: dayDiff - 1, date: localDate };
  }

  const startFillerDays = generateFillers(mockDay, days[0]);

  for (let d = 1; d < days.length; d++) {
    if (days[d].weekday - days[d - 1].weekday > 1) {
      const fillers = generateFillers(days[d - 1], days[d]);
      for (let f = 0; f < fillers.length; f++) {
        days.splice(d + f, 0, fillers[f]);
      }
    }
  }

  const endFillerDays = [];
  const lastWeekday = days[days.length - 1].weekday;
  const localDate = new Date(originalDate);
  localDate.setDate(originalDate.getDate() + lastWeekday);
  let dayDiff = 0;
  while (localDate.getDay() !== 0 /* Sunday */) {
    dayDiff++;
    localDate.setDate(localDate.getDate() + 1);
    if (dayDiff > 10) {
      // just in case something goes wrong
      break;
    }
  }
  for (let w = 1; w <= dayDiff; w++) {
    endFillerDays.push({
      date: getDate(w + lastWeekday, originalDate.toDateString()),
      isFiller: true,
    });
  }

  //do not overwrite original days array
  return startFillerDays.concat(days, endFillerDays);
}

function getDate(weekday, startingDateString) {
  const date = new Date(startingDateString);
  date.setDate(date.getDate() + weekday);
  return date;
}

function generateFillers(day1, day2) {
  let diff = day2.weekday - day1.weekday;
  if (diff >= 7) {
    diff = 7 + diff % 7;
  } else {
    diff = diff % 7;
  }
  const fillerDays = [];
  const startingDateString = day1.date.toDateString();
  for (let w = 1; w < diff; w++) {
    fillerDays.push({
      date: getDate(w, startingDateString),
      isFiller: true,
    });
  }
  return fillerDays;
}