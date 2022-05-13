import React from "react";
import PropTypes from "prop-types";
import "styles/views/Header.scss";
import { doLogout } from "../../helpers/api";
import { Button } from "components/ui/Button";
import BurgerMenu from "components/views/BurgerMenu.js";
import globalEventDispatcher from "../../helpers/globalEventDispatcher";
import { withRouter } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
    globalEventDispatcher.createTopic("onTeamIdChanged");
    globalEventDispatcher.subscribe("onTeamIdChanged", this, this.render);
  }

  render() {
    return (
      <div>
        {sessionStorage.getItem("token") != null
            ? (<BurgerMenu />)
            : ""}

        <div className="header container" style={{ height: this.props.height }}>
          <h1 className="header title">Shift Planner</h1>

          <div className="header button">
            {sessionStorage.getItem("token") != null ? (
              <div>
                <Button
                  onClick={() => this.props.history.push("/user/teams")}
                >
                  Current Team: {sessionStorage.getItem("teamId")}
                </Button>
                <Button
                  onClick={() =>
                    doLogout().then(() => this.props.history.push("/"))
                  }
                >
                  Log out
                </Button>
              </div>
            ) : (
              <div>
                <Button onClick={() => this.props.history.push("/login")}>Log in</Button>
                <Button onClick={() => this.props.history.push("/register")}>
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  height: PropTypes.string,
};

export default withRouter(Header);
