import PropTypes from "prop-types";
import { Player } from "../../../models/Player";
import * as React from "react";

export const StatBoard = (props) => {
  return (
    <div>
      <PlayerStats player={props.player} />
      <ul>
        {props.playerFoes.map((player) => (
          <PlayerStats player={player} />
        ))}
      </ul>
    </div>
  );
};

StatBoard.propTypes = {
  player: PropTypes.objectOf(Player).isRequired,
  playerFoes: PropTypes.arrayOf(Player).isRequired,
};

const PlayerStats = (props) => {
  return (
    <div>
      <div>player id: {props.player.id}</div>
      {props.player.user ? <div>user id: {props.player.user.id}</div> : null}
      {props.player.user ? <div>email: {props.player.user.email}</div> : null}
      <div>rank: {props.player.rank}</div>
      <div>status: {props.player.status}</div>
    </div>
  );
};

PlayerStats.propTypes = {
  player: PropTypes.objectOf(Player).isRequired,
};