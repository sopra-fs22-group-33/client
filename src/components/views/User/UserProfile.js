import { useHistory } from "react-router-dom";
import { doLogout } from "../../../helpers/api";

export const UserProfile = () => {
  const history = useHistory();

  return (
    <div>
      <div>
        <button onClick={() => history.push("/user/calendar")}>calendar</button>
        <button onClick={() => history.push("/user/teams")}>teams</button>
        <button onClick={() => doLogout().then(() => history.push("/"))}>
          log out
        </button>
      </div>

      <button onClick={() => history.push("/user/profile/invitations")}>
        invitations
      </button>
    </div>
  );
};
