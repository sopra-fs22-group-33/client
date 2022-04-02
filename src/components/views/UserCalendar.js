import {doLogout} from "../../helpers/api";
import { useHistory } from "react-router-dom";

export const UserCalendar = () => {
  const history = useHistory();

  return (
    <div>
      <button onClick={() => history.push("/user/profile")}>profile</button>
      <button onClick={() => history.push("/team")}>team</button>
      <button onClick={() => doLogout().then(() => history.push("/"))}>
        log out
      </button>
    </div>
  );
};
