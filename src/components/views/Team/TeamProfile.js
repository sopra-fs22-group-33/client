import {useHistory, useParams} from "react-router-dom";
import {api, handleError, doLogout} from "../../../helpers/api";
import React, {useEffect, useState} from "react";
import {Spinner} from "../../ui/Spinner";
import BaseContainer from "../../ui/BaseContainer";
import {Button} from "../../ui/Button";
import "styles/views/ProfileInfo.scss";
import avatar from "../../../images/avatar1.png";

//component for a TEAM MEMBER
export const TeamMember = ({ teamMember }) => (
    <div className="team member container2">
        <div className="team member icon">
            <img src={avatar} />
        </div>
        <div className="team member username">{teamMember.username}</div>
        <div className="team member email">{teamMember.email}</div>

    </div>
);

export const TeamProfile = () => {
    const history = useHistory();

    //hooks
    const [users, setUsers] = useState(null);

    //fetch all users in team only once
    useEffect(() => {
        const fetchData = async (props) => {
            try {
                const response = await api.get(
                    `/teams/${sessionStorage.getItem("teamId")}/users`,
                    {
                        headers: {token: sessionStorage.getItem("token")},
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
            <div className="team container">
                <ul className="team member-list">
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
