import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Auth.scss";
import BaseContainer from "components/ui/BaseContainer";

const Chunk = (props) => {

    return (
        <div
            style={{
                position: "relative",
                top: 0,
                left: 0,
                height: 20,
                width: 20,
                background: "green",
            }}></div>
    )

}

const Snake = (props) => {

    const Snake = [100,100];

    const step = 50;

}

const Gameboard = (props) => {

    return (
        <div
        style={{
            position: "absolute",
            top: 150,
            left: 400,
            height: 500,
            width: 500,
            background: "black",
        }}>
            <Chunk />
    </div>
    )
}


export class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentGame: null,
        };
    }


    mockStartGame = async () => {
        const requestBody = JSON.stringify({players: [{chunks: [{x: 0, y: 0}]}]});
        const mockGame= (await api.post('/games', requestBody)).data;
        console.log("game created");
    }




    getUpdatedGame = async () => {

        const currentGame= (await api.get('/games')).data;
        console.log("yes");

    }

    // timer works (8fps), api request doesn't, http 500
    // setInterval(getUpdatedGame, 125);

    makeMove = () => {

        // PUT request
    }


    render() {
        return (
            <div>
                <Button
                onClick={this.mockStartGame}>Start Game</Button>
                <Gameboard />
            </div>
        )
    }
};