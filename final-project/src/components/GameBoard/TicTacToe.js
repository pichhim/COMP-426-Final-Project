import React from "react";

import GameBoard from './index'

function TicTacToe(props) {

    const rows = 3;
    const columns = 3

    // Initializes board model width the correct size

    // The function defines behavior on mouse click

    // Function returns boolean values for whether the tile should become highlighted


    return (
        <GameBoard
            width={400} // Board width (px)
            height={400} // Board height (px)
            rows={rows} // Number of rows
            columns={columns} // Number of columns
            boardColor={'#44AA44'} // Color of board
            borderColor={'#228822'} // Border color
            highlightColor={'#FF4444'} // Highlight color
            board={props.data.board} // 2d array of tiles on board
            started={props.data.started}
            onClick={props.onClick}
        />
    )
}

export default TicTacToe;