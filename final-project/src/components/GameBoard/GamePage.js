import React from "react";

import GameBoard from './index'

function GamePage() {




    return (
        <GameBoard
            width={800}
            height={800}
            rows={10}
            columns={10}
            boardColor={'#44AA44'}
            borderColor={'#FFFFFF'}
            hightlightColor={'#AA4444'}
            highlightStyle={'column'}
        />
    )
}

export default GamePage;