import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {Box} from "grommet";

import {TItemDto} from "../../../../types/TItem";
import {TWeaponDto} from "../../../../types/TWeapon";

import PlayerContext from "../../../../contexts/PlayerContext";
import GameMasterContext from "../../../../contexts/GameMasterContext";

import {shuffle} from "../../../../services/CardService";
import {generateEnemies} from "../../../../services/EnemyService";

import GameEquipmentsPartial from "./Partials/GameEquipmentsPartial";
import GameRoundPartial from "./Partials/GameRoundPartial";
import GameTurnActionsPartial from "./Partials/GameTurnActionsPartial";
import GameEnemyCirclePartial from "./Partials/GameEnemyCirclePartial";

import LEVELS from "../../../../game/Levels";
import TEnemyDto from "../../../../types/TEnemyDto";

const DELAY = 1000;

interface Props {
    isPlaying: boolean
}

const GamePartial: FC<Props> = ({isPlaying}) => {
    const {player} = useContext(PlayerContext);
    const {level, region} = useContext(GameMasterContext);

    const [round, setRound] = useState<number>(-1);
    const [enemies, setEnemies] = useState<Array<TEnemyDto> | null>(null);
    const [equipments, setEquipments] = useState<Array<TItemDto | TWeaponDto> | null>(null);
    const [turnActions, setTurnActions] = useState<Array<TItemDto | TWeaponDto>>([]);

    const onApplyAction = useCallback(() => {
        console.error("TODO: ApplyActions")
    }, []);

    useEffect(() => {
        if (isPlaying && player != null && equipments == null) {
            console.log("Initialize Game");
            console.log("Settings:", {
                level: LEVELS[level].name,
                region: LEVELS[level].regions[region].name,
                player: player.equipments
            });

            setEnemies(generateEnemies(LEVELS[level].regions[region]));
            setEquipments(shuffle(player.equipments));
            setRound(0);
        }
    }, [isPlaying, equipments])

    return (
        <Box animation={isPlaying ? {type: "fadeIn", delay: DELAY} : "fadeOut"}
             height={window.innerHeight + "px"}
             width={window.innerWidth + "px"}
             background="dark"
             style={{position: "absolute", zIndex: isPlaying ? 600 : -1}}
        >
            {/* Enemy Circle */}
            {enemies != null && <GameEnemyCirclePartial isVisible={isPlaying} delay={DELAY + 2000} enemies={enemies}/>}

            {/* Player Turn Actions */}
            <GameTurnActionsPartial turnActions={turnActions} applyActions={onApplyAction}/>

            {/* Player Equipments */}
            {equipments != null &&
            <GameEquipmentsPartial isVisible={isPlaying}
                                   delay={DELAY + 1000}
                                   round={round}
                                   equipments={equipments}
                                   onTurnEquipmentsChange={setTurnActions}
                                   onTurnEquipmentsReset={() => setTurnActions([])}/>
            }

            {/* Game Round */}
            <GameRoundPartial isVisible={isPlaying} delay={DELAY + 1500} round={round}/>
        </Box>
    );
};

export default GamePartial;
