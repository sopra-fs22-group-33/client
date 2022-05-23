import * as React from "react";
import { api, fetchGames, handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import Box from "@mui/material/Box";
import BaseContainer from "../ui/BaseContainer";

export async function setOffline(gameId, player) {
  player.statusOnline = "OFFLINE";
  await api.put(`games/${gameId}/${player.id}`, player);
}

class GameLobby extends React.Component {
  constructor(props) {
    super(props);

    this.isJoiningGame = false;

    this.state = {
      games: [],
      selectedGame: null,
      selectedPlayer: null,
    };

    this.componentCleanup = this.componentCleanup.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.componentCleanup);
    this.update();
  }

  componentCleanup() {
    if (!this.isJoiningGame) {
      setOffline(
        sessionStorage.getItem("gameId"),
        this.state.selectedPlayer
      ).then(() => {
        sessionStorage.removeItem("gameId");
        sessionStorage.removeItem("playerId");
      });
    } else {
      sessionStorage.removeItem("gameId");
      sessionStorage.removeItem("playerId");
    }
  }

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener("beforeunload", this.componentCleanup); // remove the event handler for normal unmounting
  }

  async update() {
    fetchGames(sessionStorage.getItem("id")).then((games) => {
      this.setState({ games });
      for (let game of games) {
        if (this.state.selectedGame.id === game.id) {
          this.setState({selectedGame: game});
          break;
        }
      }
    });
    if (
      this.state.selectedGame &&
      this.calcPlayersOnline(this.state.selectedGame.players) ===
        this.state.selectedGame.players.length
    ) {
      this.isJoiningGame = true;
      this.props.history.push("/game");
    }
    setTimeout(() => {
      this.update();
    }, 500);
  }

  handleGameBoardClick(ev, game, player) {
    async function setOnline() {
      player.statusOnline = "ONLINE";
      await api.put(`games/${game.id}/${player.id}`, player);
    }

    try {
      if (this.state.selectedGame && this.state.selectedPlayer) {
        setOffline(this.state.selectedGame.id, this.state.selectedPlayer);
      }

      setOnline().then(() => {
        sessionStorage.setItem("gameId", game.id);
        sessionStorage.setItem("playerId", player.id);
        game.isActive = true;
        this.setState({ selectedGame: game, selectedPlayer: player });
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
    let content = <div>no games</div>;
    if (this.state.games.length > 0) {
      content = (
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
                    {this.calcPlayersOnline(game.players)} /{" "}
                    {game.players.length}
                  </div>
                </Box>
              );
            })}
        </div>
      );
    }
    return <BaseContainer>{content}</BaseContainer>;
  }
}

export default withRouter(GameLobby);