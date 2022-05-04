import {useHistory} from "react-router-dom";
import {api, doLogout, handleError} from "helpers/api";
import * as React from "react";
import {validateCalendar} from "helpers/validations";
import {useEffect, useState} from "react";
import {MemberCalendar} from "../../ui/calendar/MemberCalendar";
import {Button} from "../../ui/Button";
import BaseContainer from "../../ui/BaseContainer";

export const TeamCalendar = () => {
    const history = useHistory();
    const [calendar, setCalendar] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get(
                    `/teams/${localStorage.getItem("teamId")}/calendars`
                );
                console.log(response.data);

                setCalendar(validateCalendar(response.data));
            } catch (e) {
                alert(
                    `Something went wrong during fetching the calendar: \n${handleError(
                        e
                    )}`
                );
            }
        }

        fetchData();
    }, []);

    async function doSave() {
        try {
            const requestBody = JSON.stringify({
                days: calendar.days,
                startingDate: calendar.startingDate,
            });
            await api.put(
                `/teams/${localStorage.getItem("teamId")}/calendars`,
                requestBody
            );

            alert("Saved successfully");
        } catch (error) {
            alert(
                `Something went wrong during saving the calendar: \n${handleError(
                    error
                )}`
            );
        }
    }

    if (!calendar) {
        return <div>fetching calendar</div>;
    }

    return (

        <div>
            <BaseContainer>
                <div className="navigation-button-container container">
                    <div className="navigation-button-container title">
                        <h1>Team Calendar</h1>
                    </div>
                    <div className="navigation-button-container button">
                        <Button onClick={() => history.push("/team/calendar/edit")}>Edit</Button>
                        <Button onClick={() => doSave()}>Save</Button>
                        <Button onClick={() => history.push("/team/profile")}>Team Profile</Button>
                    </div>
                </div>
            </BaseContainer>
            <div>
                <MemberCalendar
                    startingDate={calendar.startingDate}
                    days={calendar.days}
                />
            </div>
        </div>

    );
};
