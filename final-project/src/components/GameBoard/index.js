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

    const highlightOptions = () => {
        switch(props.highlightStyle) {
            
        }
    }


    return (
        <canvas
            ref={canvasRef}
            width={props.width}
            height={props.height}
            onMouseOver={}
        />

    )
}

export default GameBoard;