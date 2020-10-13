import React, { useRef, useEffect } from "react";

function GameBoard(props) {

    const canvasRef = useRef(null);

    useEffect(() => {
        drawBase()
    }, []);

    const drawBase = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.fillStyle = props.boardColor;
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        ctx.lineWidth = 5;
        ctx.strokeStyle = props.borderColor
        const rowWidth = Math.round(canvasRef.current.height / props.rows)
        for (let i = 1; i < props.rows; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * rowWidth);
            ctx.lineTo(canvasRef.current.width, i * rowWidth);
            ctx.stroke();
        }

        const rowHeight = Math.round(canvasRef.current.width / props.columns)
        for (let i = 1; i < props.columns; i++) {
            ctx.beginPath();
            ctx.moveTo(i * rowHeight, 0);
            ctx.lineTo(i * rowHeight, canvasRef.current.height);
            ctx.stroke();
        }

        ctx.fillStyle = props.pieceColor;

        for (let i = 0; i < props.board.length; i++) {
            for (let j = 0; j < props.board[i].length; j++) {
                if (props.board[i][j] === true) {
                    ctx.beginPath();
                    ctx.arc(j * rowHeight + rowHeight / 2, i * rowWidth + rowWidth / 2, Math.min(rowWidth, rowHeight) * 0.44, 0, 2 * Math.PI, false);
                    ctx.fill();
                }
            }
        }
    }

    const highlightOptions = e => {

        drawBase();
        let { x, y } = calcIndex(e)
        switch (props.highlightStyle) {
            case 'column':
                highlightColumn(x)
                break;
            case 'row':
                highlightRow(y)
                break;
            case 'single':
                highlightSingle(x, y)
                break;
            default:
                break;
        }
    }

    const calcIndex = e => {
        const rowWidth = Math.round(canvasRef.current.height / props.rows)
        const rowHeight = Math.round(canvasRef.current.width / props.columns)

        let x = Math.floor((e.clientX - e.target.offsetLeft) / rowHeight);
        let y = Math.floor((e.clientY - e.target.offsetTop) / rowWidth);
        return { x, y }
    }

    const highlightSingle = (x, y) => {
        // Highlights a single tile
        const ctx = canvasRef.current.getContext('2d');
        ctx.lineWidth = 5;
        ctx.strokeStyle = props.highlightColor;

        const rowWidth = Math.round(canvasRef.current.height / props.rows);
        const rowHeight = Math.round(canvasRef.current.width / props.columns);

        ctx.strokeRect(x * rowHeight, y * rowWidth, rowHeight, rowWidth);

    }

    const highlightColumn = (x) => {
        // Highlights all tiles in the same column as the mouse
        for (let y = 0; y < props.rows; y++) {
            highlightSingle(x, y);
        }
    }

    const highlightRow = (y) => {
        // Highlights all tiles in the same column as the mouse
        for (let x = 0; x < props.columns; x++) {
            highlightSingle(x, y);
        }
    }


    return (
        <canvas
            ref={canvasRef}
            width={props.width}
            height={props.height}
            onMouseMove={highlightOptions}
            onMouseLeave={drawBase}
            onClick={(e) => props.handleClick(calcIndex(e))}
        />

    )
}

export default GameBoard;