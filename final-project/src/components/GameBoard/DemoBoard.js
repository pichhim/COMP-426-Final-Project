import React, { useEffect, useState } from "react";

import GameBoard from './index'

function DemoBoard() {

    const [board, setBoard] = useState([[false]])
    const rows = 3;
    const columns = 3;

    // Initializes board model width the correct size
    useEffect(() => {
        let tempBoard = [];
        for (let i = 0; i < rows; i++) {
            tempBoard[i] = []
            for (let j = 0; j < columns; j++) {
                tempBoard[i][j] = false;
            }
        }
        setBoard(tempBoard)
    }, []);

    // The function defines behavior on mouse click
    const handleClick = ({x, y}) => {
        let newBoard = board.map((arr) => (arr.slice()));
        newBoard[y][x] = 'YOU'

        console.log({
            justPlayed: 'YOU',
            nextPlayer: 'THEM',
            board: newBoard
        })
        setBoard(newBoard)
    }

    // Function returns boolean values for whether the tile should become highlighted
    const mouseRules = (x,y) => {
        return !board[y][x]
    }


    return (
        <GameBoard
            width={800} // Board width (px)
            height={800} // Board height (px)
            boardColor={'#44AA44'} // Color of board
            borderColor={'#228822'} // Border color
            highlightColor={'#FF4444'} // Highlight color
            pieceColor={'#000000'} // Color of board pieces
            highlightStyle={'single'} // highlighting style, supports single, column, and row. If not defined there will be no highlight
            board={board} // 2d array of tiles on board
            handleClick={handleClick} // Function for handling click
            highlightRules={mouseRules} // Function defining whether tile should be highlighted
        />
    )
}

export default DemoBoard;