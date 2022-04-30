import { useHistory } from "react-router-dom";
import { useState } from "react";
import { doLogout } from "helpers/api";

export const Welcome = () => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") && !!localStorage.getItem("id")
  );

  let content;

  if (isAuthenticated) {
    content = (
      <div>
        <button onClick={() => history.push("/user")}>me</button>
        <button onClick={() => history.push("/team")}>team</button>
        <button
          onClick={() => doLogout().then(() => setIsAuthenticated(false))}
        >
          log out
        </button>
        <button onClick={() => history.push("/game")}>game</button>
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
