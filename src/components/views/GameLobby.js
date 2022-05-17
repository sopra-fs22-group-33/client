import * as React from "react";
import { api, fetchGames, handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import Box from "@mui/material/Box";

class GameLobby extends React.Component {
  constructor(props) {
    super(props);

    this.isLeaving = false;

    this.state = {
      games: [],
      selectedGame: null,
    };
  }

  componentDidMount() {
    this.update();
  }

  componentWillUnmount() {
    this.isLeaving = true;
  }

  async update() {
    if (this.isLeaving) {
      return;
    }
    fetchGames(sessionStorage.getItem("id")).then((games) => {
      this.setState({ games });
    });
    if (
      this.state.selectedGame &&
      this.calcPlayersOnline(this.state.selectedGame.players) ===
        this.state.selectedGame.players.length
    ) {
      this.props.history.push("/game");
    }
    setTimeout(() => {
      this.update();
    }, 500);
  }

  handleGameBoardClick(ev, game, player) {
    async function setOnline() {
      player.statusOnline = "ONLINE";
      return await api.put(`games/${game.id}/${player.id}`, player);
    }

    try {
      setOnline().then((response) => {
        sessionStorage.setItem("gameId", game.id);
        sessionStorage.setItem("playerId", player.id);
        game.isActive = true;
        this.setState({ selectedGame: game });
      });
    } catch (e) {
      alert(
        `Something went wrong when trying to enter the game:\n${handleError(e)}`
      );
    }
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

  calcPlayersOnline(players) {
    return players.filter((player) => player.statusOnline === "ONLINE").length;
  }

  render() {
    return (
      <div>
        {this.state.games
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((game) => {
            const player = this.getPlayerForUser(
              parseInt(sessionStorage.getItem("id")),
              game.players
            );
            return (
              <Box
                style={{
                  padding: 20,
                  background:
                    this.state.selectedGame &&
                    this.state.selectedGame.id === game.id
                      ? "lightcoral"
                      : "lightgray",
                }}
                key={game.id}
                onClick={(ev) => this.handleGameBoardClick(ev, game, player)}
              >
                <div>game id: {game.id}</div>
                <div>my email: {player.user.email}</div>
                <div>my player id:{player.id}</div>
                <div>my status: {player.statusOnline}</div>
                <div>number of players: {game.players.length}</div>
                <div>
                  number of players online:{" "}
                  {this.calcPlayersOnline(game.players)} / {game.players.length}
                </div>
              </Box>
            );
          })}
      </div>
    );
  }
}

export default withRouter(GameLobby);