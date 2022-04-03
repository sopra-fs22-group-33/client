import {useHistory} from "react-router-dom";
import {api, doLogout, handleError} from "../../helpers/api";
import {useState} from "react";
import User from "../../models/User";


const Team = ({team, getTeam}) => (

    <div className="team container">
        <a className="team name" onClick={() => getTeam(team.id) }>{team.name} </a>
        <div className="team id">id: {team.id}</div>

        <ul className="team member-list">
            {team.map(teamMember => (
                <TeamMember
                    teamMember={teamMember}
                />

            ))}
        </ul>

    </div>

);
const TeamMember = ({team}) => (

    <div className="team member container">
        <div className="team member id">id: {team.id}</div>
    </div>

);

Team.propTypes = {
    user: PropTypes.object
};


export const AllTeams = () => {
    const history = useHistory();
    const user = localStorage.getUser();

    //hooks
    const [teams, setTeams] = useState(null);

    //fetch all teams user is part of from backend
    const fetchData = async (props) => {
        try {
            const response = await api.get(`/users/${user.id}/teams`);
            setTeams(response.data);
        } catch (error) {
            alert(`Something went wrong with fetching the teams the user is part of: \n${handleError(error)}`);
        }
    }
    //execute
    fetchData();

    let content = <Spinner/>;

    if (teams) {
        content = (
            <div className="game">
                <ul className="game user-list">
                    {teams.map(team => (
                        <Team
                            team={team}
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
