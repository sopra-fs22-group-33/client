import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useHistory, useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import {FormField, PasswordFormField} from "../../ui/FormField";

const UserProfileEdit = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html

  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const token = sessionStorage.getItem("token");
        const id = sessionStorage.getItem("id")
        const response = await api.get(`/users/${id}`, {
          headers: {token}
        })

        // Get the returned profile
        setUsername(response.data.username);
        setEmail(response.data.email);
        console.log("User has been set");

      } catch (error) {
        console.error("Details:", error);
        alert("Something went wrong while fetching the users! See the console for details.");
      }
    }

    fetchData();
  }, []);

  const doSaveEditProfile = async () => {
    const requestBody = JSON.stringify({ username, email, password });
    const id = sessionStorage.getItem("id")
    await api.put(`/users/${id}`, requestBody, {
      headers: { token: sessionStorage.getItem("token") },
    });

    // Route to right place here
    history.goBack();
  };

  let content = <Spinner />;

  content = (
    <div className="auth container">
      <div className="auth form">
        <PasswordFormField
          label="New Password"
          value={password}
          onChange={(pn) => setPassword(pn)}
        />
        <div className="auth button-container">
          <Button disabled={!password} onClick={() => doSaveEditProfile()}>
            Save
          </Button>
          <Button onClick={() => history.goBack()}>Cancel</Button>
        </div>
      </div>
    </div>
  );

  return (
    <BaseContainer>
      <div className="navigation-button-container container">
        <div className="navigation-button-container title">
          <h1>Change Password</h1>
        </div>
        <div className="navigation-button-container button">
        </div>
      </div>
      {content}
    </BaseContainer>
  );
};

export default UserProfileEdit;