import { useHistory } from "react-router-dom";
import { api, doLogout, handleError } from "../../../helpers/api";
import { useEffect, useState } from "react";
import { Team } from "./AllTeams";

async function doAccept(teamId) {
  try {
    await api.put(
      `/users/${localStorage.getItem("id")}/invitations/${teamId}?accept=true`,
      null,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
  } catch (e) {
    alert(`Something went wrong while accepting the invitation:\n${handleError(e)}`);
  }
}

async function doDecline(teamId) {
  try {
    await api.delete(
      `/users/${localStorage.getItem("id")}/invitations/${teamId}`,
      null,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
  } catch (e) {
    alert(`Something went wrong while declining the invitation:\n${handleError(e)}`);
  }
}

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

  let content = <div>invitations will appear here</div>;

  if (invitations) {
    content = (
      <div>
        <ul>invitations:</ul>
        {invitations.map((team) => (
          <ul>
            <Team team={team} />
            <button onClick={() => doAccept(team.id)}>accept</button>
            <button onClick={() => doDecline(team.id)}>decline</button>
          </ul>
        ))}
      </div>
    );
  }

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
