import Box from "@mui/material/Box";
import * as React from "react";
import PropTypes from "prop-types";
import { Player } from "../../../models/Player";
import "styles/views/Team.scss";

export const GameLobbyEntity = (props) => {
  function calcPlayersOnline(players) {
    return players.filter((player) => player.statusOnline === "ONLINE").length;
  }

  return (
    <Box
      className={"team container"}
      style={{
        padding: 20,
        background: props.isSelected ? "linear-gradient(to right, #3C4FFA, #3DD7F9)" : null,
      }}
      onClick={props.onClick}
    >
      <div className={"team name 2"}>
        players online: {calcPlayersOnline(props.game.players)} /{" "}
        {props.game.players.length}
      </div>
      <div>my status: {props.player ? props.player.statusOnline : null}</div>
      <div>
        {props.game.players
          .sort((a, b) => (a.id < b.id ? 1 : -1))
          .map((player) => (
            <ul key={player.id}>{player.user.username}</ul>
          ))}
      </div>
    </Box>
  );
};

GameLobbyEntity.propTypes = {
  game: PropTypes.object.isRequired,
  player: PropTypes.objectOf(Player),
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};