import { useHistory } from "react-router-dom";
import { doLogout } from "helpers/api";
import * as React from "react";
import { Calendar } from "components/ui/Calendar";

export const TeamCalendar = () => {
  const history = useHistory();

  let validatedCalendar = {
    startingDate: "someDateFormat",
    days: [
      { weekday: "MONDAY", slots: ["range", "range"] },
      { weekday: "TUESDAY", slots: ["range", "range"] },
    ],
  };

  return (
    <div>
      <div>
        button container
        <button onClick={() => history.push("/team/profile")}>profile</button>
        <button onClick={() => history.push("/user")}>me</button>
        <button onClick={() => doLogout().then(() => history.push("/"))}>
          logout
        </button>
      </div>
      <div>
        calendar container
        <Calendar startingDate={validatedCalendar.startingDate} days={validatedCalendar.days} />
      </div>
    </div>
  );
};
