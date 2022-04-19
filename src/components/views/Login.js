import React, { useState } from "react";
import {api, getToken, handleError} from "helpers/api";
import User from "models/User";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Auth.scss";
import BaseContainer from "components/ui/BaseContainer";
import { FormField } from "components/ui/FormField";

export const Login = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ email, password });
      const response = await api.post("/users/login", requestBody);

      const user = new User(response.data);
      user.token = getToken(response)
      localStorage.setItem("token", user.token);
      localStorage.setItem("id", user.id);

      history.push("/user");
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
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
            label="Password"
            value={password}
            onChange={(un) => setPassword(un)}
          />
          <div className="auth button-container">
            <Button
              disabled={!email || !password}
              width="100%"
              onClick={() => doLogin()}
            >
              Login
            </Button>
          </div>
          <button onClick={() => history.push("/register")}>
            Create new account instead?
          </button>
        </div>
      </div>
    </BaseContainer>
  );
};
