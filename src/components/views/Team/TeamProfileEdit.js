import React, { useEffect, useState } from "react";
import { api, handleError } from "../../../helpers/api";
import { TeamMember } from "../User/AllTeams";
import { useHistory } from "react-router-dom";
import BaseContainer from "../../ui/BaseContainer";
import {Button} from "../../ui/Button";
import {Spinner} from "../../ui/Spinner";
import {FormField} from "../../ui/FormField";

export const TeamProfileEdit = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();

  const [name, setName] = useState(null);

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html

  const doSaveEditProfile = async () => {
    const requestBody = JSON.stringify({ name });
    const id = sessionStorage.getItem("teamId")
    await api.put(`/teams/${id}`, requestBody, {
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
              label="Name"
              value={name}
              onChange={(un) => setName(un)}
          />

          <div className="button-container">
            <Button disabled={!name} onClick={() => doSaveEditProfile()}>
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
            <h1>Edit Team Profile</h1>
          </div>
          <div className="navigation-button-container button">
          </div>
        </div>
        {content}
      </BaseContainer>
  );
};

export default TeamProfileEdit;
