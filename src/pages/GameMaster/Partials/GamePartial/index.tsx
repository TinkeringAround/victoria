import React, {FC, useContext, useEffect, useState} from 'react';
import {Box} from "grommet";

import {TGame} from "../../../../types/TGame";

import PlayerContext from "../../../../contexts/PlayerContext";
import GameMasterContext from "../../../../contexts/GameMasterContext";

import {shuffle} from "../../../../services/CardService";

import GameEquipmentsPartial from "./Partials/GameEquipmentsPartial";
import GameRoundPartial from "./Partials/GameRoundPartial";

import LEVELS from "../../../../game/Levels";

const DELAY = 1000;

interface Props {
    isPlaying: boolean
}

const GamePartial: FC<Props> = ({isPlaying}) => {
    const {player} = useContext(PlayerContext);
    const {level, region} = useContext(GameMasterContext);

    const [round, setRound] = useState<number>(-1);
    const [gameState, setGameState] = useState<TGame | null>(null);

    useEffect(() => {
        if (isPlaying && player != null && gameState == null) {
            console.log("Initialize Game");
            console.log("Settings:", {
                level: LEVELS[level].name,
                region: LEVELS[level].regions[region].name,
                player: player.equipments
            })

            setGameState({
                equipments: shuffle(player.equipments)
            });

            setRound(0);
        }
    }, [isPlaying, gameState])

    return (
        <Box animation={isPlaying ? {type: "fadeIn", delay: DELAY} : "fadeOut"}
             height={window.innerHeight + "px"}
             width={window.innerWidth + "px"}
             background="dark"
             style={{position: "absolute", zIndex: isPlaying ? 600 : -1}}
        >
            {/* Player Equipments Background */}
            <GameEquipmentsPartial isVisible={isPlaying} delay={DELAY + 1000}/>

            {/* Game Round */}
            <GameRoundPartial isVisible={isPlaying} delay={DELAY + 1500} round={round}/>

            {/* Cards */}
            <Box width="calc(50% - )" height="200px" style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                zIndex: 3
            }}>

            </Box>

        </Box>
    );
};

export default GamePartial;
