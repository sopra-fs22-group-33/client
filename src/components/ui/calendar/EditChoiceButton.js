import { Button } from "../Button";
import { Popover } from "@mui/material";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

export const EditChoiceButton = (props) => {
  const history = useHistory();
  const [prefAnchorEl, setPrefAnchorEl] = useState(undefined);

  return (
    <Button
      onClick={(ev) =>
        prefAnchorEl === undefined
          ? setPrefAnchorEl(ev.currentTarget)
          : setPrefAnchorEl(undefined)
      }
    >
      Edit
      <Popover
        open={prefAnchorEl !== undefined}
        anchorEl={prefAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Button
          onClick={() => props.setEditing ? props.setEditing("base") : history.push({pathname: "/team/calendar/edit", state: {editing: "base"}})}
        >
          Base
        </Button>
        <Button
          onClick={() => props.setEditing ? props.setEditing("special") : history.push({pathname: "/team/calendar/edit", state: {editing: "special"}})}
        >
          Special
        </Button>
        {sessionStorage.getItem("isAdmin") === "true" ? (
          <Button
            onClick={() => props.setEditing ? props.setEditing("calendar") : history.push({pathname: "/team/calendar/edit", state: {editing: "calendar"}})}
          >
            Calendar
          </Button>
        ) : null}
      </Popover>
    </Button>
  );
};

EditChoiceButton.propTypes = {
    setEditing: PropTypes.func,
}