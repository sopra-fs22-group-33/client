import {FormField} from "../../ui/FormField";
import React, {useState} from "react";
import {api, handleError} from "../../../helpers/api";
import {useHistory} from "react-router-dom";
import BaseContainer from "../../ui/BaseContainer";
import {Button} from "../../ui/Button";

export const TeamInvite = () => {
    const history = useHistory();
    const [email, setEmail] = useState();

    async function doInvite() {
        try {
            const requestBody = JSON.stringify({email});
            await api.post(
                `/teams/${sessionStorage.getItem("teamId")}/users`,
                requestBody,
                {
                    headers: {token: sessionStorage.getItem("token")},
                }
            );

            history.push("/team/profile/edit");
        } catch (e) {
            alert(
                `Something went wrong while sending the invite:\n${handleError(e)}`
            );
        }
    }

    return (
        <BaseContainer>
            <div className="navigation-button-container container">
                <div className="navigation-button-container title">
                    <h1>Invite User</h1>
                </div>
                <div className="navigation-button-container button">
                </div>
            </div>
            <div className="auth container">
            <div className="auth form">
                <FormField
                    label="User email"
                    value={email}
                    onChange={(n) => setEmail(n)}
                />
                <div className="button-container">
                    <Button onClick={doInvite}>Invite</Button>
                    <Button onClick={() => history.push("/team/profile/edit")}>
                        Cancel
                    </Button>
                </div>
            </div>
            </div>
        </BaseContainer>
    );
};
