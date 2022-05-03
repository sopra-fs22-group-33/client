import {useHistory, useParams} from "react-router-dom";
import {api, handleError, doLogout} from "../../../helpers/api";
import {TeamMember} from "../User/AllTeams";
import {useEffect, useState} from "react";
import {Spinner} from "../../ui/Spinner";
import BaseContainer from "../../ui/BaseContainer";

export const TeamProfile = () => {
    const history = useHistory();

    //hooks
    const [users, setUsers] = useState(null);

    //fetch all users in team only once
    useEffect(() => {
        const fetchData = async (props) => {
            try {
                const response = await api.get(
                    `/teams/${localStorage.getItem("teamId")}/users`,
                    {
                        headers: {token: localStorage.getItem("token")},
                    }
                );
                setUsers(response.data);
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

    let content = <Spinner/>;

    if (users) {
        // console.log(users);
        content = (
            <div className="team">
                <ul className="team member details-list">
                    {users.map((teamMember) => (
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
        <BaseContainer>
            <div>
                <button onClick={() => history.push("/team/profile/edit")}>edit</button>
            </div>
            {content}
        </BaseContainer>
    );
};
