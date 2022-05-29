import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {api, doLogout, handleError} from "../../../helpers/api";
import {Team} from "./AllTeams";
import BaseContainer from "../../ui/BaseContainer";
import {Button} from "../../ui/Button";

export const UserInvitations = () => {
    const history = useHistory();
    const [invitations, setInvitations] = useState(null);

    useEffect(() => {
        async function fetchInvitations() {
            try {
                const response = await api.get(
                    `/users/${sessionStorage.getItem("id")}/invitations`,
                    {headers: {token: sessionStorage.getItem("token")}}
                );
                setInvitations(response.data);
            } catch (e) {
                alert(
                    `Something went wrong while fetching the invitations:\n${handleError(
                        e
                    )}`
                );
            }
        }

        fetchInvitations();
    }, []);

    async function doAccept(teamId) {
        try {
            await api.put(
                `/users/${sessionStorage.getItem(
                    "id"
                )}/invitations/${teamId}?accept=true`,
                null,
                {
                    headers: {token: sessionStorage.getItem("token")},
                }
            );

            // force reload all invitations
            setInvitations(null);
        } catch (e) {
            alert(
                `Something went wrong while accepting the invitation:\n${handleError(
                    e
                )}`
            );
        }
    }

    async function doDecline(teamId) {
        try {
            await api.put(
                `/users/${sessionStorage.getItem("id")}/invitations/${teamId}?accept=false`,
                null,
                {
                    headers: {token: sessionStorage.getItem("token")},
                }
            );

            // force reload all invitations
            setInvitations(null);
        } catch (e) {
            alert(
                `Something went wrong while declining the invitation:\n${handleError(
                    e
                )}`
            );
        }
    }

    let content = <div>no new invitations</div>;
    if (invitations != null && invitations.length > 0) {
        content = (
            <div>
                {invitations.map((team) => (
                    <ul>
                        <Team team={team}/>
                        <Button onClick={() => doAccept(team.id)}>Accept</Button>
                        <Button onClick={() => doDecline(team.id)}>Decline</Button>
                    </ul>
                ))}
            </div>
        );
    }

    return (
        <BaseContainer>
            <div className="navigation-button-container container">
                <div className="navigation-button-container title">
                    <h1>Invitations</h1>
                </div>
                <div className="navigation-button-container button">
                    <Button onClick={() => history.push("/user/profile")}>Back</Button>
                </div>
            </div>
            {content}
        </BaseContainer>
    );
};
