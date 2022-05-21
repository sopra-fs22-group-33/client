import { useHistory, useParams } from "react-router-dom";
import {
  api,
  handleError,
  doLogout,
  getTeamIsAdmin,
} from "../../../helpers/api";
import React, { useEffect, useState } from "react";
import { Spinner } from "../../ui/Spinner";
import BaseContainer from "../../ui/BaseContainer";
import { Button } from "../../ui/Button";
import avatar from "../../../images/avatar1.png";
import "styles/views/TeamProfil.scss";
import globalEventDispatcher from "../../../helpers/globalEventDispatcher";

//component for a TEAM MEMBER
export const TeamMember = ({ teamMember, removeUser }) => (
  <div className="team member container2">
    <div className="team member icon">
      <img src={avatar} />
    </div>
    <div className="team member username">{teamMember.user.username}</div>
    <div className="team member email">{teamMember.user.email}</div>
    {teamMember.isAdmin ? <div className="team member admin">Admin</div> : ""}
    {sessionStorage.getItem("isAdmin")=="true" && teamMember.isAdmin == false ? (
      <div
        className="team member removebutton "
        onClick={() => {
          removeUser(teamMember.user.id);
        }}
      >
        Remove
      </div>
    ) : (
      ""
    )}
  </div>
);

export const TeamProfile = () => {
  const history = useHistory();

  //hooks
  const [users, setUsers] = useState(null);
  const [team, setTeam] = useState(null);

  //fetch all users in team only once
  useEffect(() => {
    const fetchData = async (props) => {
      try {
        const responseTeams = await api.get(
          `/teams/${sessionStorage.getItem("teamId")}`,
          {
            headers: { token: sessionStorage.getItem("token") },
          }
        );
        setTeam(responseTeams.data);
      } catch (error) {
        alert(
          `Something went wrong with fetching the details of the team: \n${handleError(
            error
          )}`
        );
      }
    };

    //execute
    fetchData();
  }, []);

  async function removeUser(userId) {
    try {
      const responseTeams = await api.delete(
        `/teams/${team.id}/users/${userId}`,
        {
          headers: { token: sessionStorage.getItem("token") },
        }
      );
    } catch (error) {
      alert(
        `Something went wrong with deleting the user from the team: \n${handleError(
          error
        )}`
      );
    }
      window.location.reload();
  }

  let content = <Spinner />;
  let teamName = <Spinner />;

  if (team) {
    // console.log(users);
    teamName = team.name;
    content = (
      <div className="team container2">
        <ul className="team member-list2">
          {team.memberships.map((teamMember) => (
            <TeamMember teamMember={teamMember} removeUser={removeUser} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <BaseContainer>
      <div className="navigation-button-container container">
        <div className="navigation-button-container title">
          <h1>{teamName}</h1>
        </div>
        <div className="navigation-button-container button">
          <Button onClick={() => history.push("/team/profile/invite")}>
            Invite User
          </Button>
          <Button onClick={() => history.push("/team/profile/edit")}>
            Edit Name
          </Button>
        </div>
      </div>
      <div></div>
      {content}
    </BaseContainer>
  );
};
