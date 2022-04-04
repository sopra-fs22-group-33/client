import { useHistory } from "react-router-dom";
import { doLogout } from "../../helpers/api";

export const TeamProfile = () => {
  const history = useHistory();

  return (
    <div>
      <button onClick={() => history.push("/team/calendar")}>calendar</button>
      <button onClick={() => history.push("/user")}>me</button>
      <button onClick={() => doLogout().then(() => history.push("/"))}>
        logout
      </button>
    </div>
  );
};
