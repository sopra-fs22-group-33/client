import {randomId} from "./validations";

const someMonday = new Date(1652058720000);

export function mapCalendarToWeek(days) {
  const week = [];

  // iterate over weekdays
  for (let w = 0; w < 7; w++) {
    const date = new Date();
    date.setDate(someMonday.getDate() + w);
    const weekDay = { date: date };
    // find the right day in days
    let day;
    for (day of days) {
      if (day.date.getDay() === weekDay.date.getDay()) {
        break;
      }
    }
    weekDay.id = randomId();
    weekDay.slots = JSON.parse(JSON.stringify(day.slots)); /* deepcopy */

    week.push(weekDay);
  }
  return week;
}

export function mapWeekToAdminCalendar(week, days) {
  week.sort((a, b) =>
    a.date.getDay() > b.date.getDay() ? 1 : -1
  ); /* sort based on weekday */
  for (let day of days) {
    const weekDay = week[day.date.getDay()];
    day.slots = weekDay.slots;
  }
}
    