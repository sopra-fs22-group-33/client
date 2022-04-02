import { useHistory } from "react-router-dom";
import { doLogout } from "../../helpers/api";

export const TeamCalendar = () => {
  const history = useHistory();

  return (
    <div>
      <button onClick={() => history.push("/team/profile")}>profile</button>
      <button onClick={() => history.push("/user")}>me</button>
      <button onClick={() => doLogout().then(() => history.push("/"))}>
        logout
      </button>
    </div>
  );
};