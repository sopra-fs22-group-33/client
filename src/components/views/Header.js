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
        <BurgerMenu />

        <div className="header container" style={{ height: this.props.height }}>
          <h1 className="header title">Shift Planner</h1>
          <button
            className="header team"
            onClick={() => this.props.history.push("/user/teams")}
          >
            Current Team: {sessionStorage.getItem("teamId")}
          </button>
          <div className="header button">
            <Button onClick={() => doLogout().then(() => this.props.push("/"))}>
              Log out
            </Button>
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
