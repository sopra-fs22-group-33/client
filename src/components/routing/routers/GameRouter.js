import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { UserRouter } from "./UserRouter";
import { Game } from "../../views/Game";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameLobby from "../../views/GameLobby";

export const GameRouter = (props) => (
  <div>
    <Switch>
      <Route exact path={`${props.base}`}>
        <GameGuard>
          <Game />
        </GameGuard>
      </Route>
      <Route exact path={`${props.base}/lobby`}>
        <GameLobby />
      </Route>
    </Switch>
  </div>
);

UserRouter.propTypes = {
  base: PropTypes.string,
};