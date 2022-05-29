import React, { useState } from "react";
import { api, getToken, handleError } from "helpers/api";
import User from "models/User";
import { useHistory } from "react-router-dom";
import { Button, Button2 } from "components/ui/Button";
import "styles/views/Auth.scss";
import BaseContainer from "components/ui/BaseContainer";
import { FormField, PasswordFormField } from "components/ui/FormField";

export const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ email, password });
      const response = await api.post("/users/login", requestBody);

      const user = new User(response.data);
      user.token = getToken(response);
      sessionStorage.setItem("token", user.token);
      sessionStorage.setItem("id", user.id);

      history.push("/user");
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer style={{ height: "86vh", paddingTop: "16vh" }}>
      <div className="auth container" style={{ marginTop: "0" }}>
        <div className="auth form">
          <FormField
            label="Email"
            value={email}
            onChange={(n) => setEmail(n.toString().toLowerCase())}
          />
          <PasswordFormField
            label="Password"
            value={password}
            onChange={(un) => setPassword(un)}
          />
          <div className="auth button-container">
            <Button disabled={!email || !password} onClick={() => doLogin()}>
              Login
            </Button>
          </div>
          <div className="auth button-container">
            <Button2 onClick={() => history.push("/register")}>
              Create new account instead?
            </Button2>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};
