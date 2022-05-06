import { useHistory } from "react-router-dom";
import { useState } from "react";
import { doLogout } from "helpers/api";
import {Button} from "../ui/Button";
import BaseContainer from "../ui/BaseContainer";

export const Welcome = () => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("token") && !!sessionStorage.getItem("id")
  );

  let content;

  if (isAuthenticated) {
    content = (
        <BaseContainer>
        <div className="navigation-button-container container">
            <div className="navigation-button-container title">
                <h1>Welcome!</h1>
            </div>
            <div className="navigation-button-container button">
                <Button onClick={() => history.push("/user")}>Me</Button>
                <Button onClick={() => history.push("/team")}>Team</Button>
                <Button onClick={() => history.push("/game")}>Game</Button>
            </div>
        </div>
  </BaseContainer>
    );
  } else {
    content = (
        <BaseContainer>
        <div className="navigation-button-container container">
            <div className="navigation-button-container title">
                <h1>Welcome!</h1>
            </div>
            <div className="navigation-button-container button">
                <Button onClick={() => history.push("/login")}>sign in</Button>
                <Button onClick={() => history.push("/register")}>sign up</Button>
            </div>
        </div>
            Maybe we can just get rid of this view and forward to log in if not authenticated/forward to user calendar if authenticated
        </BaseContainer>
    );
  }

  return content;
};
