import PropTypes from "prop-types";
import { Player } from "../../../models/Player";
import * as React from "react";
import { Box } from "@mui/material";

export const StatBoard = (props) => {
  return (
    <Box sx={{ width: "15%" }}>
      <PlayerStats player={props.player} background={"green"} />
      {props.playerFoes
        .sort((a, b) => (a.rank <= b.rank ? 1 : -1))
        .map((player) => (
          <PlayerStats player={player} background={"orange"} />
        ))}
    </Box>
  );
};

StatBoard.propTypes = {
  player: PropTypes.objectOf(Player).isRequired,
  playerFoes: PropTypes.arrayOf(Player).isRequired,
};

const PlayerStats = (props) => {
  return (
    <Box
      sx={{
        background: props.background,
        padding: "0.5em",
        marginBottom: "1.5%",
        borderRadius: "1.5vh",
      }}
    >
      {props.player.user ? (
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bolder",
          }}
        >
          {props.player.user.username}
        </div>
      ) : null}
      <div>status: {props.player.status}</div>
      <div>rank: {props.player.rank}</div>
    </Box>
  );
};

PlayerStats.propTypes = {
  player: PropTypes.objectOf(Player).isRequired,
  background: PropTypes.string,
};