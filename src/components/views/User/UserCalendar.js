import {doLogout} from "../../../helpers/api";
import { useHistory } from "react-router-dom";
import BaseContainer from "../../ui/BaseContainer";

export const UserCalendar = () => {
  const history = useHistory();

  return (
    <BaseContainer>
        <h1>User Calendar</h1>

        <button onClick={() => history.push("/user/teams")}>teams</button>
    </BaseContainer>
  );
};
