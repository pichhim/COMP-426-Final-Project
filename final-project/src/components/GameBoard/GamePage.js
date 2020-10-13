import React, { useEffect, useState } from "react";

import GameBoard from './index'

function GamePage() {

    const [board, setBoard] = useState([[false]])
    const rows = 10;
    const columns = 10

    useEffect(() => {
        let tempBoard = [];
        for (let i = 0; i < rows; i++) {
            tempBoard[i] = []
            for (let j = 0; j < columns; j++) {
                tempBoard[i][j] = false;
            }
        }
        setBoard(tempBoard)
        console.log(tempBoard)
    }, []);

    const handleClick = ({x, y}) => {
        console.log('clicked')
        let newBoard = board.map((arr) => (arr.slice()));
        newBoard[y][x] = !newBoard[y][x]
        setBoard(newBoard)
    }


    return (
        <GameBoard
            width={800}
            height={800}
            rows={rows}
            columns={columns}
            boardColor={'#44AA44'}
            borderColor={'#228822'}
            highlightColor={'#FF4444'}
            pieceColor={'#000000'}
            highlightStyle={'single'}
            board={board}
            handleClick={handleClick}
        />
    )
}

export default GamePage;