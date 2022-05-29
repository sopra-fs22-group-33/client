import { useHistory } from "react-router-dom";
import {
  api,
  handleError
} from "../../../helpers/api";
import React, { useEffect, useState } from "react";
import { Spinner } from "../../ui/Spinner";
import BaseContainer from "../../ui/BaseContainer";
import { Button } from "../../ui/Button";
import avatar from "../../../images/avatar1.png";
import "styles/views/TeamProfil.scss";
import {StyledDialog} from "../../ui/StyledDialog";

//component for a TEAM MEMBER
export const TeamMember = ({ teamMember, onClick }) => (
  <div className="team member container2">
    <div className="team member icon">
      <img src={avatar}  alt={" "}/>
    </div>
    <div className="team member username">{teamMember.user.username}</div>
    <div className="team member email">{teamMember.user.email}</div>
    {teamMember.isAdmin ? <div className="team member admin">Admin</div> : ""}
    {sessionStorage.getItem("isAdmin")==="true" && teamMember.isAdmin === false ? (
      <div
        className="team member removebutton "
        onClick={onClick}
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
  const [team, setTeam] = useState(null);

  const [userToBeRemoved, setUserToBeRemoved] = useState(null);
  const [isDeletingTeam, setIsDeletingTeam] = useState(false);

  //fetch all users in team only once
  useEffect(() => {
    const fetchData = async () => {
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
      await api.delete(
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

  async function handleDeleteTeam() {
    try {
      await api.delete(`/teams/${team.id}`, {
        headers: { token: sessionStorage.getItem("token") },
      });
    } catch (e) {
      alert(`Something went wrong while deleting the team:\n${handleError(e)}`);
    }
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
            <TeamMember
              teamMember={teamMember}
              onClick={() => setUserToBeRemoved(teamMember.user)}
            />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <BaseContainer>
      <StyledDialog open={isDeletingTeam}>
        <div>Are you sure you want to delete the entire team?</div>
        <Button
          onClick={() =>
            handleDeleteTeam().then(() => {
              setIsDeletingTeam(false);
              sessionStorage.removeItem("teamName");
              sessionStorage.removeItem("teamId");
              history.push("/user/teams");
            })
          }
        >
          yes
        </Button>
        <Button onClick={() => setIsDeletingTeam(false)}>no</Button>
      </StyledDialog>
      <StyledDialog open={userToBeRemoved !== null}>
        <div>
          Are you sure you want to remove{" "}
          {userToBeRemoved ? userToBeRemoved.username : null} from{" "}
          {sessionStorage.getItem("teamName")}?
        </div>
        <Button
          onClick={() =>
            removeUser(userToBeRemoved.id).then(() => setUserToBeRemoved(null))
          }
        >
          yes
        </Button>
        <Button onClick={() => setUserToBeRemoved(null)}>no</Button>
      </StyledDialog>
      <div className="navigation-button-container container">
        <div className="navigation-button-container title">
          <h1>{teamName}</h1>
        </div>
        {sessionStorage.getItem("isAdmin") === "true" ? (
          <div className="navigation-button-container button">
            <Button onClick={() => history.push("/team/profile/invite")}>
              Invite User
            </Button>
            <Button onClick={() => history.push("/team/profile/edit")}>
              Edit Name
            </Button>
            <Button onClick={() => setIsDeletingTeam(true)}>Delete Team</Button>
          </div>
        ) : null}
      </div>
      <div/>
      {content}
    </BaseContainer>
  );
};
