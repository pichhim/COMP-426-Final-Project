import React from "react";

function GameBoard(props) {

    const borderThick = 2

    const boardStyle = {
        width: `${props.width - borderThick * 2}px`,
        height: `${props.height - borderThick * 2}px`,
        background: `${props.borderColor}`,
        borderRadius: '0.5rem',
        margin: '12px 0px 12px 0px',
        padding: `${borderThick}px`,
        overflow: 'hidden'
    };

    const rowStyle = {
        width: `100%`,
        height: `calc(100% / ${props.rows})`,
        display: 'flex',
        flexDirection: 'row',
    };

    const tileStyle = {
        width: `calc(100% / ${props.columns})`,
        height: `calc(100% - ${borderThick * 2})`,
        margin: `${borderThick }px`,
        background: `${props.boardColor}`,
        border: `solid ${props.borderColor}`,
        borderRadius: '0.5rem',
        transition: '1s'
    };

    return (
        <div style={boardStyle}>
            {props.board.map((row, rIndex) => {
                return (
                    <div style={rowStyle} key={`${rIndex}`}>{row.map((tile, cIndex) => {
                        return (
                            <button style={tileStyle} key={`${rIndex}${cIndex}`} onClick={props.onClick ? () => props.onClick({x: cIndex, y: rIndex}) : null}>
                                {String(tile) !== 'SYSTEM' ? <span>{String(tile) === String(props.started) ? "X" : "O"}</span> : null}
                            </button>
                        )
                    })}</div>
                )
            })}
        </div>
    )
}

export default GameBoard;