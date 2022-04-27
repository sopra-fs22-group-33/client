import { useHistory } from "react-router-dom";
import {api, doLogout, handleError} from "../../../helpers/api";
import React, {useState} from "react";
import BaseContainer from "../../ui/BaseContainer";
import {Button} from "../../ui/Button";
import {FormField} from "../../ui/FormField";

export const CreateTeam = () => {
    const history = useHistory();

    //hooks
    const [name, setName] = useState(null);


    const doCreateTeam = async () => {
        try {
            const requestBody = JSON.stringify({name});
            const token = localStorage.getItem("token");
            const response = await api.post("/teams", requestBody, {
                headers: {token}});

            console.log(response);

            // todo: store teamId in localStorage

            history.push("/user/teams");
        } catch (e) {
            alert(`Something went while creating the team: \n${handleError(e)}`);
        }
    };

    return (
        <BaseContainer>
            <div>
                <button onClick={() => history.push("/user/calendar")}>calendar</button>
                <button onClick={() => history.push("/user/teams")}>teams</button>
                <button onClick={() => doLogout().then(() => history.push("/"))}>log out</button>
            </div>
            <div className="auth form">
                <FormField
                    label="Team Name"
                    value={name}
                    onChange={(n) => setName(n)}
                />

                <div className="button-container">
                    <Button
                        onClick={() => doCreateTeam()}
                    >
                        Create Team
                    </Button>
                </div>
            </div>
        </BaseContainer>
    );
}

