import { useHistory } from "react-router-dom";
import { api, doLogout, handleError } from "../../../helpers/api";
import { useEffect, useState } from "react";
import { Team } from "./AllTeams";

export const UserProfile = () => {
  const history = useHistory();
  const [invitations, setInvitations] = useState(null);

  useEffect(() => {
    async function fetchInvitations() {
      try {
        const response = await api.get(
          `/users/${localStorage.getItem("id")}/invitations`,
          { headers: { token: localStorage.getItem("token") } }
        );
        console.log(response.data);
        setInvitations(response.data);
      } catch (e) {
        alert(
          `Something went wrong while fetching the invitations:\n${handleError(
            e
          )}`
        );
      }
    }

    fetchInvitations();
  }, []);

  const content = invitations ? <Team team={invitations[0]} /> : undefined;

  return (
    <div>
      <button onClick={() => history.push("/user/calendar")}>calendar</button>
      <button onClick={() => history.push("/user/teams")}>teams</button>
      <button onClick={() => doLogout().then(() => history.push("/"))}>
        log out
      </button>
      {content}
    </div>
  );
};
