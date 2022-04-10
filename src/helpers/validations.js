const WEEKDAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

/**
 * Validates a calendar and tries to get relevant data on assignedUsers if present
 *
 * @param {object} calendar
 * @throws Error
 * @returns {{startingDate: string, days: array}}
 */
export function validateCalendar(calendar) {
  const baseErrorMessage = "Invalid calendar:";

  function wrappedError(message, o) {
    throw Error(`${baseErrorMessage} ${message}\n ${JSON.stringify(o)}`);
  }

  if (
    !calendar.hasOwnProperty("days") ||
    !Array.isArray(calendar.days) ||
    calendar.days.length === 0
  ) {
    wrappedError("invalid 'days'", calendar);
  }
  if (
    !calendar.hasOwnProperty("startingDate") ||
    typeof calendar.startingDate !== "string" ||
    calendar.startingDate.length === 0
  ) {
    wrappedError("invalid 'startingDate'", calendar);
  }

  for (let i in calendar.days) {
    let day = calendar.days[i];
    if (
      !day.hasOwnProperty("weekday") ||
      typeof day.weekday !== "string" ||
      !WEEKDAYS.includes(day.weekday)
    ) {
      wrappedError("invalid 'weekday'", day);
    }
    if (
      !day.hasOwnProperty("slots") ||
      !Array.isArray(day.slots)
      // slots can be empty
    ) {
      wrappedError("invalid 'slots'", day);
    }

    for (let i in day.slots) {
      let slot = day.slots[i];
      if (!slot.hasOwnProperty("from") || typeof slot.from !== "number") {
        wrappedError("invalid 'from'", slot);
      }
      if (!slot.hasOwnProperty("to") || typeof slot.to !== "number") {
        wrappedError("invalid 'to'", slot);
      }
      if (slot.from === slot.to) {
        wrappedError(`invalid range ${slot.from - slot.to}`, slot);
      }
    }
  }

  return calendar;
}
