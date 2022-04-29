import { useEffect, useState } from "react";
import { api, handleError } from "../../../helpers/api";
import { TeamMember } from "../User/AllTeams";
import { useHistory } from "react-router-dom";

export const TeamProfileEdit = () => {
  const history = useHistory();

  const [users, setUsers] = useState(null);

  async function doSave() {
    console.log("save");
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

  let content = <div>fetching users</div>;

  if (users) {
    content = (
      <ul>
        {users.map((user) => (
          <TeamMember teamMember={user} />
        ))}
      </ul>
    );
  }

  return (
    <div>
      <div>
        <button onClick={doSave}>save</button>
        <button onClick={() => history.push("/team/profile")}>cancel</button>
      </div>
      <div>
        <button onClick={() => history.push("/team/profile/invite")}>
          invite new user
        </button>
      </div>
      {content}
    </div>
  );
};
