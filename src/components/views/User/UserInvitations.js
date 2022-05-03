import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { api, doLogout, handleError } from "../../../helpers/api";
import { Team } from "./AllTeams";
import BaseContainer from "../../ui/BaseContainer";

export const UserInvitations = () => {
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

  async function doAccept(teamId) {
    try {
      await api.put(
        `/users/${localStorage.getItem(
          "id"
        )}/invitations/${teamId}?accept=true`,
        null,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      // force reload all invitations
      setInvitations(null);
    } catch (e) {
      alert(
        `Something went wrong while accepting the invitation:\n${handleError(
          e
        )}`
      );
    }
  }

  async function doDecline(teamId) {
    try {
      await api.put(
        `/users/${localStorage.getItem("id")}/invitations/${teamId}?accept=false`,
        null,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      // force reload all invitations
      setInvitations(null);
    } catch (e) {
      alert(
        `Something went wrong while declining the invitation:\n${handleError(
          e
        )}`
      );
    }
  }

  let content = <div>no new invitations</div>;
  console.log(invitations);
  if (invitations != null && invitations.length > 0) {
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
    <BaseContainer>
      <h1>Invitations</h1>
      <div>
        <button onClick={() => history.push("/user/calendar")}>calendar</button>
        <button onClick={() => history.push("/user/teams")}>teams</button>
        <button onClick={() => doLogout().then(() => history.push("/"))}>
          log out
        </button>
      </div>
      <button onClick={() => history.push("/user/profile")}>back</button>
      {content}
    </BaseContainer>
  );
};
