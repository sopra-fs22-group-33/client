import {useHistory, useParams} from "react-router-dom";
import {api, handleError, doLogout} from "../../../helpers/api";
import {TeamMember} from "../User/AllTeams";
import React, {useEffect, useState} from "react";
import {Spinner} from "../../ui/Spinner";
import BaseContainer from "../../ui/BaseContainer";
import {Button} from "../../ui/Button";
import "styles/views/ProfileInfo.scss";


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
            <div className="navigation-button-container container">
                <div className="navigation-button-container title">
                    <h1>Team Profile</h1>
                </div>
                <div className="navigation-button-container button">
                    <Button onClick={() => history.push("/team/profile/invite")}>Invite User</Button>
                    <Button onClick={() => history.push("/team/profile/edit")}>Edit</Button>
                </div>
            </div>
            <div>
            </div>
            {content}
        </BaseContainer>
    );
};
