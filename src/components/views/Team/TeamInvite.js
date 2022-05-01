import { FormField } from "../../ui/FormField";
import React, { useState } from "react";
import { api, handleError } from "../../../helpers/api";
import { useHistory } from "react-router-dom";

export const TeamInvite = () => {
  const history = useHistory();
  const [email, setEmail] = useState();

  async function doInvite() {
    try {
      const requestBody = JSON.stringify({ email });
      await api.post(
        `/teams/${localStorage.getItem("teamId")}/users`,
        requestBody,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      history.push("/team/profile/edit");
    } catch (e) {
      alert(
        `Something went wrong while sending the invite:\n${handleError(e)}`
      );
    }
  }

  return (
    <div>
      <div className="auth form">
        <FormField
          label="invited user email"
          value={email}
          onChange={(n) => setEmail(n)}
        />

        <div className="button-container">
          <button onClick={doInvite}>invite</button>
          <button onClick={() => history.push("/team/profile/edit")}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};
