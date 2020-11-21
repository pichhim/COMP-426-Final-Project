import React from "react";

import GameBoard from './index'

function TicTacToe(props) {

    const rows = 3;
    const columns = 3;

    function checkWin(board) {

        const uid = String(props.uid);

        // Checks if the player won
        for (let i = 0; i < rows; i++) {
            if (board[i][0] === uid && board[i][1] === uid && board[i][2] === uid) {
                return uid
            }
        }

        for (let i = 0; i < columns; i++) {
            if (board[0][i] === uid && board[1][i] === uid && board[2][i] === uid) {
                return uid
            }
        }

        if (board[0][0] === uid && board[1][1] === uid && board[2][2] === uid) return uid;
        if (board[0][2] === uid && board[1][1] === uid && board[2][0] === uid) return uid;

        // Checks if there is still an empty space on the board
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (board[i][j] === 'SYSTEM') return "NONE"
            }
        }

        // If the board is full and there is no winner, the system wins I guess
        return "SYSTEM"
    }

    function handleBoardClick({ x, y }) {
        if (props.sendState == null || props.uid == null || props.friendID == null) return;

        let newBoard = props.data.board.map((arr) => (arr.slice()));
        if (newBoard[y][x] !== 'SYSTEM') return;
        newBoard[y][x] = `${props.uid}`
        console.log(checkWin(newBoard))

        const tempState = {
            date: new Date().toISOString(),
            author: props.uid,
            type: 'TICTACTOE',
            content: {
                started: props.data.started,
                board: newBoard,
                justPlayed: props.uid,
                nextPlayer: props.friendID,
                winner: checkWin(newBoard)
            }
        }
        props.sendState(tempState)
    }


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
            onClick={handleBoardClick}
        />
    )
}

export default TicTacToe;