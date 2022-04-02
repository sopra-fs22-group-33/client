import { api, handleError } from "../../helpers/api";
import { useHistory } from "react-router-dom";

export const UserCalendar = () => {
  const history = useHistory();

  async function doLogout() {
    try {
      // todo: check REST specification
      const requestBody = JSON.stringify({ isOnline: false });
      await api.put("/user/" + localStorage.getItem("id"), requestBody);
    } catch (e) {
      alert(`Something went wrong during logout: \n${handleError(e)}`);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      history.push("/");
    }
  }

  return (
    <div>
      <button onClick={() => history.push("/user/profile")}>profile</button>
      <button onClick={() => history.push("/team")}>team</button>
      <button onClick={() => doLogout()}>log out</button>
    </div>
  );
};
