import * as React from "react";
import { fetchGames } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import { randomId } from "../../helpers/validations";

class GameLobby extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
    };
  }

  componentDidMount() {
    fetchGames(sessionStorage.getItem("id")).then((games) => {
      this.setState({ games });
    });
  }

  handleGameClick(ev, game, player) {
    sessionStorage.setItem("gameId", game.id);
    sessionStorage.setItem(
      "playerId", player.id
    );
    this.props.history.push("/game");
  }

  getPlayerForUser(userId, players) {
    let p, player;
    for (p = 0; p < players.length; p++) {
      player = players[p];
      console.log(`id ${userId}, player userId: ${player.user.id}`)
      if (userId === player.user.id) {
        return player;
      }
    }
    return null
  }

  render() {
    return (
      <div>
        {this.state.games.map((game) => {
          const player = this.getPlayerForUser(
            parseInt(sessionStorage.getItem("id")),
            game.players
          );
          return (
            <ul
              key={randomId()}
              onClick={(ev) => this.handleGameClick(ev, game, player)}
            >
              <div>game id: {game.id}</div>
              <div>my email: {player.user.email}</div>
              <div>my player id:{player.id}</div>
              <div>my status: {player.status}</div>
              <div>number of players: {game.players.length}</div>
            </ul>
          );
        })}
      </div>
    );
  }
}

export default withRouter(GameLobby);