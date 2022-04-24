import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Auth.scss";
import BaseContainer from "components/ui/BaseContainer";
import { FormField } from "components/ui/FormField";

const Snake = (props) => {

    const Snake = [100,100];
    const snakeSize = 1;

    const step = 50;


}

export const Game = (props) => {

    const getUpdatedGame = () => {

        // GET request

    }

    const makeMove = () => {

        // PUT request
    }

    return (
        <div
        style={{
        height: 500,
        width: 500,
        background: "black",
        }}>
            <div></div>
        </div>
    )

};