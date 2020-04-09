import React, {FC, useEffect, useState} from 'react';

import GameMaster from "../../../game/GameMaster";

const GAME_MASTER_ID = "gameMaster";

const GameMasterPartial: FC = () => {
    const [game, setGame] = useState<GameMaster | null>(null);

    useEffect(() => {
        if (!game) {
            let newGame = new GameMaster(GAME_MASTER_ID);
            newGame.createScene();
            newGame.doRender();
            setGame(newGame);
        }
    }, []);

    return (
        <canvas
            id={GAME_MASTER_ID}
            style={{
                width: "calc(100% - 200px)",
                height: "100%"
            }}/>
    );
};

export default GameMasterPartial;
