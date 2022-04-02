import {useHistory} from "react-router-dom";
import {api, handleError} from "../../helpers/api";

export const TeamCalendar = () => {
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
      <button onClick={() => history.push("/team/profile")}>profile</button>
      <button onClick={() => history.push("/user")}>me</button>
      <button onClick={() => doLogout()}> logout</button>
    </div>
  );
}