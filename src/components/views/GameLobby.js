import * as React from "react";
import { fetchGames } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import { randomId } from "../../helpers/validations";
import Box from "@mui/material/Box";

class GameLobby extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
    };
  }

  componentDidMount() {
    this.update()
  }

  async update() {
    fetchGames(sessionStorage.getItem("id")).then((games) => {
      this.setState({ games });
    });
    setTimeout(() => {this.update()}, 500)
  }

  handleGameClick(ev, game, player) {
    sessionStorage.setItem("gameId", game.id);
    sessionStorage.setItem("playerId", player.id);
    this.props.history.push("/game");
  }

  getPlayerForUser(userId, players) {
    let p, player;
    for (p = 0; p < players.length; p++) {
      player = players[p];
      if (userId === player.user.id) {
        return player;
      }
    }
    return null;
  }

  render() {
    // todo: order based on id
    return (
      <div>
        {this.state.games.map((game) => {
          const player = this.getPlayerForUser(
            parseInt(sessionStorage.getItem("id")),
            game.players
          );
          return (
            <Box
              style={{ padding: 20 ,background: "gray" }}
              key={randomId()}
              onClick={(ev) => this.handleGameClick(ev, game, player)}
            >
              <div>game id: {game.id}</div>
              <div>my email: {player.user.email}</div>
              <div>my player id:{player.id}</div>
              <div>my status: {player.statusOnline}</div>
              <div>number of players: {game.players.length}</div>
            </Box>
          );
        })}
      </div>
    );
  }
}

export default withRouter(GameLobby);