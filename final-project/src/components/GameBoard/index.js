import React, { useRef, useEffect } from "react";

function GameBoard(props) {

    const canvasRef = useRef(null);

    useEffect(() => {
        initBase()
    }, []);

    const initBase = () => {
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
    }

    const highlightOptions = e => {

        initBase();
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

        let x = Math.floor((e.clientX - e.target.offsetLeft) / rowWidth);
        let y = Math.floor((e.clientY - e.target.offsetTop) / rowHeight);
        return { x, y }
    }

    const highlightSingle = (x, y) => {
        // Highlights a single tile
        const ctx = canvasRef.current.getContext('2d');
        ctx.lineWidth = 5;
        ctx.strokeStyle = props.highlightColor;

        const rowWidth = Math.round(canvasRef.current.height / props.rows);
        const rowHeight = Math.round(canvasRef.current.width / props.columns);

        ctx.strokeRect(x * rowWidth, y * rowHeight, rowWidth, rowHeight);

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
        />

    )
}

export default GameBoard;