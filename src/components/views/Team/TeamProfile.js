import {useHistory, useParams} from "react-router-dom";
import {api, handleError, doLogout} from "../../../helpers/api";
import {TeamMember} from "./AllTeams"
import {useState} from "react";
import {Spinner} from "../../ui/Spinner";

export const TeamProfile = () => {

    const history = useHistory();
    const accessedTeam = useParams();

    //hooks
    const [team, setTeam] = useState(null);

    //fetch all teams user is part of from backend
    const fetchData = async (props) => {
        try {
            const response = await api.get(`/teams/${accessedTeam.id}/users`);
            setTeam(response.data);
        } catch (error) {
            alert(`Something went wrong with fetching the details of the team: \n${handleError(error)}`);
        }
    }

    //execute
    fetchData();

    let content = <Spinner/>;

    if (team) {
        content = (
            <div className="team">
                <ul className="team member details-list">
                    {team.users.map(teamMember => (
                        <TeamMember
                            teamMember={teamMember}
                            onClick={() => history.push(`/user/${teamMember.id}`)}
                        />
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => history.push("/team/calendar")}>calendar</button>
            <button onClick={() => history.push("/user")}>me</button>
            <button onClick={() => doLogout().then(() => history.push("/"))}>
                logout
            </button>
            {content}
        </div>
    );
};
