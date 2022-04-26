import {useHistory} from "react-router-dom";
import {doLogout} from "../../../helpers/api";

export const UserProfile = () => {
    const history = useHistory();

  return (
    <div>
      <button onClick={() => history.push("/user/calendar")}>calendar</button>
      <button onClick={() => history.push("/team")}>team</button>
      <button onClick={() => doLogout().then(() => history.push("/"))}>log out</button>
    </div>
  );
}
