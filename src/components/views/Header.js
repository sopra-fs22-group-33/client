import React from "react";
import PropTypes from "prop-types";
import "styles/views/Header.scss";
import { doLogout } from "../../helpers/api";
import { Button, Button2 } from "components/ui/Button";
import BurgerMenu from "components/views/BurgerMenu.js";
import globalEventDispatcher from "../../helpers/globalEventDispatcher";
import { withRouter } from "react-router-dom";
import { HelpInfoFrame } from "../ui/helpInfo/HelpInfoFrame";

class Header extends React.Component {
  constructor(props) {
    super(props);
    globalEventDispatcher.createTopic("onTeamIdChanged");
    globalEventDispatcher.subscribe("onTeamIdChanged", this, this.render);
  }

  render() {
    return (
      <div>
        {sessionStorage.getItem("token") != null ? <BurgerMenu /> : ""}
        <div className="header container" style={{ height: this.props.height }}>
          <div className="header placeholder"/>
          <h1 className="header title">Shift Planner</h1>
          {sessionStorage.getItem("token") != null ? (
            <div className="header button-box">
                            <div className="header button-team">
                <div className={"label-box"}>
                  <div className="button-label">Team</div>
                  <div className="button-label2">
                    {sessionStorage.getItem("teamName")}
                  </div>
                </div>
                <Button onClick={() => this.props.history.push("/user/teams")}>
                  Change
                </Button>
              </div>
              <div className="header button-logout">
                <Button2
                  onClick={() =>
                    doLogout().then(() => this.props.history.push("/"))
                  }
                >
                  Logout
                </Button2>
              </div>
              <div className="header info-icon">
                <HelpInfoFrame />
              </div>
            </div>
          ) : (
            <div className="header button-box">
              <Button onClick={() => this.props.history.push("/login")}>
                Log in
              </Button>
              <Button2 onClick={() => this.props.history.push("/register")}>
                Register
              </Button2>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  height: PropTypes.string,
};

export default withRouter(Header);
