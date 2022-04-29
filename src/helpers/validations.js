export function randomId() {
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32;
}

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
    /*
    if (
      !day.hasOwnProperty("weekday") ||
      typeof day.weekday !== "number"
    ) {
      wrappedError("invalid 'weekday'", day);
    }
    */
    if (
      !day.hasOwnProperty("slots") ||
      !Array.isArray(day.slots)
      // slots can be empty
    ) {
      // wrappedError("invalid 'slots'", day);
      day.slots = [];
    }

    // todo: generate unique across calendar on backend
    day.id = day.id ? day.id : randomId();

    for (let i in day.slots) {
      let slot = day.slots[i];
      if (!slot.hasOwnProperty("timeFrom") || typeof slot.timeFrom !== "number") {
        wrappedError("invalid 'timeFrom'", slot);
      }
      if (!slot.hasOwnProperty("timeTo") || typeof slot.timeTo !== "number") {
        wrappedError("invalid 'timeFrom'", slot);
      }
      if (slot.timeFrom === slot.timeTo) {
        wrappedError(`invalid range ${slot.timeFrom - slot.timeTo}`, slot);
      }

      // todo: generate unique across calendar on backend
      slot.id = slot.id ? slot.id : randomId();
    }
  }

  return calendar;
}
