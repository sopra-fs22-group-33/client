import { useHistory } from "react-router-dom";
import {api, doLogout, handleError} from "../../../helpers/api";
import React, {useState} from "react";
import BaseContainer from "../../ui/BaseContainer";
import {Button} from "../../ui/Button";
import {FormField} from "../../ui/FormField";
import {TEMPLATE_DAYS} from "../../../fixtures/templateCalendar";

export const CreateTeam = () => {
    const history = useHistory();

    //hooks
    const [name, setName] = useState(null);


    const doCreateTeam = async () => {
        try {
            // create new team
            const teamRequestBody = JSON.stringify({ name });
            const response = await api.post("/teams", teamRequestBody, {
              headers: { token: localStorage.getItem("token") },
            });

            // create new calendar for the team
            const calendarRequestBody = JSON.stringify({
                // todo: let user choose staring date
                // startingDate: the date where optimized calendar starts
              startingDate: Date.now().toString(),
              days: TEMPLATE_DAYS,
            });
            await api.post(
              `teams/${response.data.id}/calendars`,
              calendarRequestBody,
              { headers: { token: localStorage.getItem("token") } }
            );



            history.push("/user/teams");
        } catch (e) {
            alert(`Something went while creating the team: \n${handleError(e)}`);
        }
    };

    return (
        <BaseContainer>
            <div className="auth container">
            <div className="auth form">
                <FormField
                    label="Team Name"
                    placeholder="Team Name"
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
            </div>
        </BaseContainer>
    );
}
