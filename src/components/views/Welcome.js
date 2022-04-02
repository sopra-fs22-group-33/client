import { useHistory } from "react-router-dom";
import { useState } from "react";
import { api, handleError } from "helpers/api";

export const Welcome = () => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") && !!localStorage.getItem("id")
  );

  let content;

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
      setIsAuthenticated(false);
    }
  }

  if (isAuthenticated) {
    content = (
      <div>
        <button onClick={() => history.push("/user")}>
          me
        </button>
        <button onClick={() => history.push("/team")}>
          team
        </button>
        <button onClick={() => doLogout()}> log out</button>
      </div>
    );
  } else {
    content = (
      <div>
        <button onClick={() => history.push("/login")}>sign in</button>
        <button onClick={() => history.push("/register")}>sign up</button>
      </div>
    );
  }

  return content;
};
