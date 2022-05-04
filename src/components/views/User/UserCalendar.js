import {doLogout} from "../../../helpers/api";
import { useHistory } from "react-router-dom";
import BaseContainer from "../../ui/BaseContainer";
import {Button} from "../../ui/Button";

export const UserCalendar = () => {
  const history = useHistory();

  return (
    <BaseContainer>
        <div className="navigation-button-container container">
            <div className="navigation-button-container title">
                <h1>User Calendar</h1>
            </div>
            <div className="navigation-button-container button">
                <Button onClick={() => history.push("/user/teams")}>See Teams</Button>
            </div>
        </div>

    </BaseContainer>
  );
};
