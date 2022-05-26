import Box from "@mui/material/Box";
import * as React from "react";
import PropTypes from "prop-types";
import { Player } from "../../../models/Player";

export const GameLobbyEntity = (props) => {
  function calcPlayersOnline(players) {
    return players.filter((player) => player.statusOnline === "ONLINE").length;
  }

  return (
    <Box
      style={{
        padding: 20,
        background: props.isSelected ? "lightcoral" : "lightgray",
      }}
      onClick={props.onClick}
    >
      <div>my status: {props.player ? props.player.statusOnline : null}</div>
      <div>number of players: {props.game.players.length}</div>
      <div>
        players:
        {props.game.players
          .sort((a, b) => (a.id < b.id ? 1 : -1))
          .map((player) => (
            <ul key={player.id}>{player.user.username}</ul>
          ))}
      </div>
      <div>
        number of players online: {calcPlayersOnline(props.game.players)} /{" "}
        {props.game.players.length}
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