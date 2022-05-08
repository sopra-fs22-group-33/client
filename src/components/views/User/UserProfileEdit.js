import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useHistory, useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { FormField } from "../../ui/FormField";

const UserProfileEdit = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html

  const doSaveEditProfile = async () => {
    const requestBody = JSON.stringify({ username, email });
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
        <FormField
          label="Username"
          value={username}
          onChange={(un) => setUsername(un)}
        />
        <FormField label="Email" value={email} onChange={(u) => setEmail(u)} />

        <div className="button-container">
          <Button disabled={!username || !email} onClick={() => doSaveEditProfile()}>
            Save
          </Button>
          <Button onClick={() => history.push("/team/profile")}>Cancel</Button>

        </div>
      </div>
    </div>
  );

  return (
    <BaseContainer>
      <div className="navigation-button-container container">
        <div className="navigation-button-container title">
          <h1>Edit Profile</h1>
        </div>
        <div className="navigation-button-container button">
        </div>
      </div>
      {content}
    </BaseContainer>
  );
};

export default UserProfileEdit;
