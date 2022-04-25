import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Auth.scss";
import BaseContainer from "components/ui/BaseContainer";

const Snake = (props) => {

    const Snake = [100,100];

    const step = 50;

    return (
        <div
        style={{
            position: "absolute",
            top: 250,
            left: 250,
            height: 50,
            width: 50,
            background: "green",
        }}></div>
    )

}

const Gameboard = (props) => {

    return (
        <div
        style={{
            position: "absolute",
            top: 200,
            left: 200,
            height: 500,
            width: 500,
            background: "black",
        }}>
            <Snake></Snake>
    </div>
    )
}


export const Game = (props) => {

    const currentGame = useState(null);

    const getUpdatedGame = async () => {

        const currentGame= (await api.get('/game')).data;
        console.log("yes");

    }

    // timer works (8fps), api request doesn't, http 500
    // setInterval(getUpdatedGame, 125);

    const makeMove = () => {

        // PUT request
    }



    return (
        <Gameboard>
        </Gameboard>
    )

};