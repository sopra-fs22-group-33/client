import {useHistory} from "react-router-dom";
import {api, doLogout, handleError} from "../../../helpers/api";
import {useEffect, useState} from "react";
import {Spinner} from "../../ui/Spinner";

//component for a TEAM
export const Team = ({team, getTeam}) => (

    <div className="team container">
        <a className="team name" onClick={() => getTeam(team.id) }>{team.name} </a>
        <div className="team id">id: {team.id}</div>

        <ul className="team member-list">
            {team.memberships.map(teamMember => (
                <TeamMember
                    teamMember={teamMember}
                />
            ))}
        </ul>

    </div>

);
//component for a TEAM MEMBER
export const TeamMember = ({teamMember}) => (

    <div className="team member container">
        <div className="team member id">id: {teamMember.name}</div>
    </div>

);

export const AllTeams = () => {
    const history = useHistory();

    //hooks
    const [teams, setTeams] = useState(null);

    //fetch all teams user is part of from backend only once
    useEffect(() => {
      const fetchData = async (props) => {
        try {
            const response = await api.get(
              `/users/${localStorage.getItem("id")}/teams`,
              {
                headers: { token: localStorage.getItem("token") },
              }
            );
          console.log(response.data);
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
    

    const getTeam = (teamId) => {
        history.push(`/team/${teamId}/profile`);
    }

    let content = <Spinner/>;

    if (teams) {
        content = (
            <div className="team">
                <ul className="team member-list">
                    {teams.map(team => (
                        <Team
                            team={team}
                            getTeam={getTeam}
                        />

                    ))}
                </ul>

            </div>
        );
    }

    return (
        <div>
            <button onClick={() => history.push("/user/create")}>create team</button>
            <button onClick={() => history.push("/user")}>me</button>
            <button onClick={() => doLogout().then(() => history.push("/"))}>
                logout
            </button>
            {content}
        </div>
    );
};
