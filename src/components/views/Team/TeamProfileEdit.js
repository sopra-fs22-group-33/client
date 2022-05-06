import React, { useEffect, useState } from "react";
import { api, handleError } from "../../../helpers/api";
import { TeamMember } from "../User/AllTeams";
import { useHistory } from "react-router-dom";
import BaseContainer from "../../ui/BaseContainer";
import {Button} from "../../ui/Button";

export const TeamProfileEdit = () => {
  const history = useHistory();

  const [users, setUsers] = useState(null);

  async function doSave() {
    console.log("save");
  }

  useEffect(() => {
    async function fetchTeamUsers() {
      try {
        const response = await api.get(
          `/teams/${sessionStorage.getItem("teamId")}/users`,
          {
            headers: { token: sessionStorage.getItem("token") },
          }
        );
        console.log(response.data);
        setUsers(response.data);
      } catch (e) {
        alert(
          `Something went wrong while fetching all users:\n${handleError(e)}`
        );
      }
    }

    fetchTeamUsers();
  }, []);

  let content = <div>fetching users</div>;

  if (users) {
    content = (
      <ul>
        {users.map((user) => (
          <TeamMember teamMember={user} />
        ))}
      </ul>
    );
  }

  return (
      <BaseContainer>
        <div className="navigation-button-container container">
          <div className="navigation-button-container title">
            <h1>Edit Team Profile</h1>
          </div>
          <div className="navigation-button-container button">
            <Button onClick={doSave}>Save</Button>
            <Button onClick={() => history.push("/team/profile")}>Cancel</Button>
          </div>
        </div>
        {content}
      </BaseContainer>

  );
};
