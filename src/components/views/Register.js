import { api, getToken, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import User from "models/User";
import BaseContainer from "components/ui/BaseContainer";
import {FormField, PasswordFormField} from "components/ui/FormField";
import { Button, Button2 } from "components/ui/Button";
import { TEMPLATE_USER_CALENDAR } from "../../fixtures/templateUserCalendar";

export const Register = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);

  const doRegister = async (props) => {
    try {
      const userRequestBody = JSON.stringify({ email, password, username });
      const userResponse = await api.post("/users", userRequestBody);

      const user = new User(userResponse.data);
      user.token = getToken(userResponse);

      const preferenceRequestBody = JSON.stringify(TEMPLATE_USER_CALENDAR);
      await api.post(
        `/users/${user.id}/preferences`,
        preferenceRequestBody,
        { headers: { token: user.token } }
      );

      sessionStorage.setItem("token", user.token);
      sessionStorage.setItem("id", user.id);

      history.push("/user");
    } catch (e) {
      alert(`Something went wrong during registration: \n${handleError(e)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="auth container">
        <div className="auth form">
          <FormField
            label="Email"
            value={email}
            onChange={(n) => setEmail(n)}
          />
          <FormField
            label="Username"
            value={username}
            onChange={(uun) => setUsername(uun)}
          />
          <PasswordFormField
            label="Password"
            value={password}
            onChange={(un) => setPassword(un)}
          type={"password"}
          />
          <div className="auth button-container">
            <Button
              disabled={!email || !password || !username}
              onClick={() => doRegister()}
            >
              Register
            </Button>
          </div>
          <div className="auth button-container">
            <Button2 onClick={() => history.push("/login")}>
              Sign in instead?
            </Button2>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};
