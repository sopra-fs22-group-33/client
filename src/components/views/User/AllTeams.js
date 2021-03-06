import { useHistory } from "react-router-dom";
import { api, getTeamIsAdmin, handleError } from "../../../helpers/api";
import { useEffect, useState } from "react";
import { Spinner } from "../../ui/Spinner";
import "styles/views/Team.scss";
import "styles/ui/TitleActions.scss";
import BaseContainer from "../../ui/BaseContainer";
import { Button } from "../../ui/Button";
import avatar from "../../../images/avatar1.png";
import globalEventDispatcher from "../../../helpers/globalEventDispatcher";

//component for a TEAM
export const Team = ({ team, getTeam }) => (
  <ul
    className="team container"
    onClick={() => {
      sessionStorage.setItem("teamId", team.id);
      sessionStorage.setItem("teamName", team.name);
      sessionStorage.setItem("isAdmin", getTeamIsAdmin(team.memberships));
      globalEventDispatcher.dispatch("onTeamIdChanged");
      getTeam();
    }}
  >
    <div className="team name2">{team.name} </div>
    <ul className="team member-list">
      {team.memberships.map((teamMember) => (
        <TeamMember key={teamMember.id} teamMember={teamMember} />
      ))}
    </ul>
  </ul>
);
//component for a TEAM MEMBER
export const TeamMember = ({ teamMember }) => (
  <div className="team member container2">
    <div className="team member icon">
      <img src={avatar} alt={" "} />
    </div>
    <div className="team member username">{teamMember.user.username}</div>
    <div className="team member email">{teamMember.user.email}</div>
    {teamMember.isAdmin ? <div className="team member admin">Admin</div> : ""}
  </div>
);

export const AllTeams = () => {
  const history = useHistory();

  //hooks
  const [teams, setTeams] = useState(null);

  //fetch all teams user is part of from backend only once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/users/${sessionStorage.getItem("id")}/teams`,
          {
            headers: { token: sessionStorage.getItem("token") },
          }
        );
        setTeams(response.data);
      } catch (error) {
        alert(
          `Something went wrong with fetching the teams the user is part of: \n${handleError(
            error
          )}`
        );
      }
    };

    //execute
    fetchData();
  }, []);

  const getTeam = () => {
    history.push(`/team/profile`);
  };

  let content = <Spinner />;

  if (teams) {
    content = (
      <div>
        {teams.map((team) => (
          <Team key={team.id} team={team} getTeam={getTeam} />
        ))}
      </div>
    );
  }

  return (
    <BaseContainer>
      <div className="navigation-button-container container">
        <div className="navigation-button-container title">
          <h1>Joined Teams</h1>
        </div>
        <div className="navigation-button-container button">
          <Button onClick={() => history.push("/user/create")}>
            Create Team
          </Button>
        </div>
      </div>
      {content}
    </BaseContainer>
  );
};
