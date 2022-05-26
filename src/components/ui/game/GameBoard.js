import PropTypes from "prop-types";
import * as React from "react";
import { Chunk } from "./Chunk";
import { Player } from "../../../models/Player";
import { DeathDisplay } from "./DeathDisplay";
import { deserialize } from "./helpers";
import Box from "@mui/material/Box";

export const GameBoard = (props) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: props.style ? props.style.top : 150,
        left: props.style ? props.style.left : 400,
        height: props.length,
        width: props.length,
        background: "#1e1e1e",
        borderRadius: "0.3vh",
      }}
      onClick={props.onClick}
    >
      {props.isDead ? <DeathDisplay length={props.length} /> : null}
      {props.player
        ? deserialize(props.player.chunks).map((chunk) => (
            <Chunk x={chunk.x} y={chunk.y} background={"green"} />
          ))
        : null}
      {props.playerFoes.map((player) =>
        deserialize(player.chunks).map((chunk) => (
          <Chunk x={chunk.x} y={chunk.y} background={"orange"} />
        ))
      )}
      {deserialize(props.apples).map((apple) => (
        <Chunk x={apple.x} y={apple.y} background={"red"} />
      ))}
    </Box>
  );
};

GameBoard.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,

  length: PropTypes.number.isRequired,
  player: PropTypes.objectOf(Player),
  playerFoes: PropTypes.arrayOf(Player).isRequired,
  apples: PropTypes.arrayOf(Chunk).isRequired,
  isDead: PropTypes.bool.isRequired,
};