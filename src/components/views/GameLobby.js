import * as React from "react";
import { api, fetchGames, handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import BaseContainer from "../ui/BaseContainer";
import { GameLobbyEntity } from "../ui/game/GameLobbyEntity";

export async function setOffline(gameId, player) {
  player.statusOnline = "OFFLINE";
  await api.put(`games/${gameId}/${player.id}`, player);
}

class GameLobby extends React.Component {
  constructor(props) {
    super(props);

    this.isJoiningGame = false;
    this.isLeaving = false;

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
    this.isLeaving = true;
    if (!this.isJoiningGame && this.state.selectedPlayer !== null) {
      setOffline(sessionStorage.getItem("gameId"), this.state.selectedPlayer)
        .then(() => {
          sessionStorage.removeItem("gameId");
          sessionStorage.removeItem("playerId");
        })
        .catch((e) => console.log(e));
    } else {
      sessionStorage.removeItem("gameId");
      sessionStorage.removeItem("playerId");
    }
  }

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener("beforeunload", this.componentCleanup);
  }

  async doDelete(game) {
    try {
      await api.delete(`/games/${game.id}`);
    } catch (e) {
      // 404 is fine, multiple people should try deleting the same game
      console.log(e);
    }
  }

  async update() {
    if (this.isLeaving) {
      // workaround to stop recursion on leaving page
      return;
    }
    fetchGames(sessionStorage.getItem("id")).then((games) => {
      this.setState({ games });
      for (let game of games) {
        if (this.state.selectedGame && this.state.selectedGame.id === game.id) {
          this.setState({ selectedGame: game });
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
    function wrapError(e) {
      alert(
        `Something went wrong when trying to enter the game:\n${handleError(e)}`
      );
    }

    async function setOnline() {
      player.statusOnline = "ONLINE";
      await api.put(`games/${game.id}/${player.id}`, player);
    }

    if (this.state.selectedGame && this.state.selectedPlayer) {
      setOffline(this.state.selectedGame.id, this.state.selectedPlayer).catch(
        (e) => wrapError(e)
      );
    }

    setOnline()
      .then(() => {
        sessionStorage.setItem("gameId", game.id);
        sessionStorage.setItem("playerId", player.id);
        game.isActive = true;
        this.setState({ selectedGame: game, selectedPlayer: player });
      })
      .catch((e) => wrapError(e));
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
              if (game.status === "off") {
                this.doDelete(game);
              }
              const player = this.getPlayerForUser(
                parseInt(sessionStorage.getItem("id")),
                game.players
              );
              return (
                <GameLobbyEntity
                  key={game.id}
                  game={game}
                  player={player}
                  onClick={(ev) => this.handleGameBoardClick(ev, game, player)}
                  isSelected={
                    this.state.selectedGame &&
                    this.state.selectedGame.id === game.id
                  }
                />
              );
            })}
        </div>
      );
    }
    return <BaseContainer>{content}</BaseContainer>;
  }
}

export default withRouter(GameLobby);