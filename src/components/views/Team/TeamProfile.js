import {useHistory, useParams} from "react-router-dom";
import {api, handleError, doLogout} from "../../../helpers/api";
import React, {useEffect, useState} from "react";
import {Spinner} from "../../ui/Spinner";
import BaseContainer from "../../ui/BaseContainer";
import {Button} from "../../ui/Button";
import avatar from "../../../images/avatar1.png";
import "styles/views/TeamProfil.scss";

//component for a TEAM MEMBER
export const TeamMember = ({ teamMember }) => (
    <div className="team member container2">
        <div className="team member icon">
            <img src={avatar} />
        </div>
        <div className="team member username">{teamMember.user.username}</div>
        <div className="team member email">{teamMember.user.email}</div>
        {teamMember.isAdmin
            ? <div className="team member admin">Admin</div> :''
        }
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
                        headers: {token: sessionStorage.getItem("token")},
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

    let content = <Spinner/>;
    let teamName = <Spinner/>;


    if (team) {
        // console.log(users);
        teamName = team.name;
        content = (
            <div className="team container2">
                <ul className="team member-list2">
                    {team.memberships.map((teamMember) => (
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
                    <h1>{teamName}</h1>
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
