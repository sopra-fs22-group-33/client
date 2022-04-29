import { useEffect, useState } from "react";
import { api, handleError } from "../../../helpers/api";

export const TeamProfileEdit = () => {
  const [inviteActive, setInviteActive] = useState(false);
  const [invite, setInvite] = useState(null);

  const [users, setUsers] = useState(null);

  async function doInvite() {
    console.log("sending invite");
  }

  useEffect(() => {
    async function fetchTeamUsers() {
      try {
        const response = await api.get(
          `/teams/${localStorage.getItem("teamId")}/users`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        console.log(response.data);
        setUsers(response.data);
      } catch (e) {
        alert(
          `Something went wrong while fetching all users:\n${handleError(e)}`
        );
      }
    }

    fetchTeamUsers();
  }, []);

  return <div>team profile edit</div>;
};
