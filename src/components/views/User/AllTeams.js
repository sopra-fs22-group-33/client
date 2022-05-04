import {useHistory} from "react-router-dom";
import {api, doLogout, handleError} from "../../../helpers/api";
import {useEffect, useState} from "react";
import {Spinner} from "../../ui/Spinner";
import "styles/views/Team.scss"
import "styles/ui/NavigationButtonContainer.scss"
import BaseContainer from "../../ui/BaseContainer";
import {Button} from "../../ui/Button";


//component for a TEAM
export const Team = ({team, getTeam}) => (

    <ul className="team container" onClick={() => {
        localStorage.setItem("teamId", team.id);
        getTeam()
    }}>
        <div className="team name"> name: {team.name} </div>
        <div className="team id">id: {team.id}</div>

        <ul className="team member-list">
            members:
            {team.memberships.map(teamMember => (
                <TeamMember
                    teamMember={teamMember.user}
                />
            ))}
        </ul>

    </ul>

);
//component for a TEAM MEMBER
export const TeamMember = ({teamMember}) => (

    <div className="team member container">
        <div className="team member id">id: {teamMember.id}</div>
        <div className="team member email">email: {teamMember.email}</div>
        <div className="team member name">name: {teamMember.name}</div>
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
                        headers: {token: localStorage.getItem("token")},
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
    }

    let content = <Spinner/>;

    if (teams) {
        content = (
            <div>
                {teams.map(team => (
                    <Team
                        team={team}
                        getTeam={getTeam}
                    />

                ))}
            </div>
        );
    }

    return (
        <BaseContainer>
            <div className="navigation-button-container container">
                <div className="navigation-button-container title">
                    <h1>All Teams</h1>
                </div>
                <div className="navigation-button-container button">
                    <Button onClick={() => history.push("/user/create")}>Create Team</Button>
                </div>
            </div>
            {content}
        </BaseContainer>
    );
};
