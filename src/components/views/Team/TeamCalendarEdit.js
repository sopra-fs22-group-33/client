import * as React from "react";
import { useHistory } from "react-router-dom";

export const TeamCalendarEdit = () => {
  const history = useHistory();

  function doSave() {
    console.log("save");
  }

  return (
    <div>
      <div>
        button container
        <button onClick={() => doSave()}>save</button>
        <button onClick={() => history.push("/team/calendar")}>cancel</button>
      </div>
      <div>editable base calendar</div>
    </div>
  );
};
