import { api, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import User from "models/User";
import BaseContainer from "components/ui/BaseContainer";
import { FormField } from "components/ui/FormField";
import { Button } from "components/ui/Button";

export const Register = (props) => {
  const history = useHistory();
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);

  const doRegister = async (props) => {
    try {
      const requestBody = JSON.stringify({ email: name, password: username });
      const response = await api.post("/users", requestBody);

      const user = new User(response.data);
      localStorage.setItem("token", user.token);

      // push to MainPage
      history.push("/");
    } catch (e) {
      alert(`Something went wrong during registration: \n${handleError(e)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="auth container">
        <div className="auth form">
          <FormField
            label="Username"
            value={username}
            onChange={(un) => setUsername(un)}
          />
          <FormField label="Name" value={name} onChange={(n) => setName(n)} />
          <div className="auth button-container">
            <Button
              disabled={!username || !name}
              width="100%"
              onClick={() => doRegister()}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};
