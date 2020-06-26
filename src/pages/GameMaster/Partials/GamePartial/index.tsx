import React, {FC, useContext, useEffect, useState} from 'react';
import {Box} from "grommet";

import {TItemDto} from "../../../../types/TItem";
import {TWeaponDto} from "../../../../types/TWeapon";
import TGameState from "../../../../types/TGameState";
import TGameCondition from "../../../../types/TGameCondition";

import PlayerContext from "../../../../contexts/PlayerContext";
import GameMasterContext from "../../../../contexts/GameMasterContext";
import SoundContext from "../../../../contexts/SoundContext";

import {shuffle} from "../../../../services/CardService";
import {generateEnemies} from "../../../../services/EnemyService";
import {getPlayerHealth} from "../../../../services/PlayerService";
import {gameIs, mutateGameState} from "../../../../services/GameService";

import GameEnemyCirclePartial from "./Partials/GameEnemyCirclePartial";
import GamePlayerPartial from "./Partials/GamePlayerPartial";
import GameTurnActionsPartial from "./Partials/GameTurnActionsPartial";
import GameEquipmentsPartial from "./Partials/GameEquipmentsPartial";
import GameRoundPartial from "./Partials/GameRoundPartial";

import LEVELS from "../../../../game/Levels";
import ENEMIES from "../../../../game/Enemies";

const DELAY = 1000;
const STEP_DURATION = 1500;
const STEP_DURATION_END_DELAY = 500;

interface Props {
    isPlaying: boolean
}

const GamePartial: FC<Props> = ({isPlaying}) => {
    const {player} = useContext(PlayerContext);
    const {level, region} = useContext(GameMasterContext);
    const {play} = useContext(SoundContext);

    const [running, setRunning] = useState<boolean>(false);
    const [round, setRound] = useState<number>(-1);
    const [gameState, setGameState] = useState<TGameState | null>(null);
    const [turnActions, setTurnActions] = useState<Array<TItemDto | TWeaponDto>>([]);

    const updateGameState = (newGameState: TGameState) => {
        // Disable Equipments for Animation Start
        if (!running) setRunning(true);

        setTurnActions([]);
        setGameState(newGameState);
    }

    const startGameStateUpdateRoutine = (gameStates: Array<TGameState>, condition: TGameCondition) => {
        gameStates.forEach((state, index) =>
            setTimeout(() => updateGameState(state), (index + 1) * STEP_DURATION));

        setTimeout(() => {
            if (condition === "win") {
                console.log("Won");
                // TODO: Play Rewards Screen
            } else if (condition === "loose") {
                console.log("Lost");
                // TODO: Show Loose Screen
            } else {
                console.log("Next Round");

                // TODO: Roll Dice and update enemyIndex

                setRound(round + 1);
                setRunning(false);
                return;
            }

            // TODO: CleanUp on Win or Loose
            // 1. Get Experience
            // 2. Remove used Items from Player Equipments
            // 3. Goto Region Screen
        }, ((gameStates.length) * STEP_DURATION) + STEP_DURATION_END_DELAY);
    }

    const onApplyAction = () => {
        if (player && gameState) {
            let gameWon = false, gameLost = false;
            const gameStates: Array<TGameState> = [];

            turnActions.forEach((action, index) => {
                if (!gameWon && !gameLost) {
                    const firstItem = index === 0;
                    const nextGameState = mutateGameState(player, {
                        health: firstItem ? gameState.health : gameStates[index - 1].health,
                        equipments: firstItem ? gameState.equipments : gameStates[index - 1].equipments,
                        enemyIndex: firstItem ? gameState.enemyIndex : gameStates[index - 1].enemyIndex,
                        enemies: firstItem ? gameState.enemies : gameStates[index - 1].enemies
                    }, action);

                    if (typeof nextGameState === "string") gameWon = gameIs(nextGameState, true);
                    else gameStates.push(nextGameState);
                }
            });

            // Win oder Loose
            if (gameWon) startGameStateUpdateRoutine(gameStates, "win");
            else {
                // Enemy Attack
                const lastGameState = gameStates[gameStates.length - 1];
                if (gameStates.length > 0 && lastGameState.enemies[lastGameState.enemyIndex].health > 0) {
                    const nextGameState = mutateGameState(player, {
                        health: lastGameState.health,
                        equipments: lastGameState.equipments,
                        enemyIndex: lastGameState.enemyIndex,
                        enemies: lastGameState.enemies
                    }, ENEMIES[lastGameState.enemies[lastGameState.enemyIndex].name].stats.attack);

                    if (typeof nextGameState === "string") gameLost = gameIs(nextGameState, false);
                    else gameStates.push(nextGameState);
                }

                startGameStateUpdateRoutine(gameStates, gameLost ? "loose" : "round");
            }
        }
    }

    useEffect(() => {
        if (isPlaying && player != null && gameState == null) {
            console.log("Initialize Game");
            const newGame = {
                health: getPlayerHealth(player),
                equipments: shuffle(player.equipments),
                enemyIndex: 0,
                enemies: generateEnemies(LEVELS[level].regions[region]),
            }

            setRound(1);
            setGameState(newGame);
        }
    }, [isPlaying, gameState])

    useEffect(() => {
        if (isPlaying) play("game")
    }, [isPlaying])

    useEffect(() => {
        console.log("Gamestate update")
    }, [gameState])

    return (
        <Box animation={isPlaying ? {type: "fadeIn", delay: DELAY} : "fadeOut"}
             height={window.innerHeight + "px"}
             width={window.innerWidth + "px"}
             background="dark"
             style={{position: "absolute", zIndex: isPlaying ? 600 : -1}}
        >
            {/* Enemy Circle */}
            <GameEnemyCirclePartial gameState={gameState}/>

            {/* Player */}
            {gameState != null &&
            <GamePlayerPartial health={gameState.health}/>}

            {/* Player Equipments */}
            {gameState != null &&
            <GameEquipmentsPartial key="GameEquipments"
                                   isVisible={isPlaying && !running}
                                   delay={DELAY + 1000}
                                   round={round}
                                   equipments={gameState.equipments}
                                   onTurnEquipmentsChange={setTurnActions}
                                   onTurnEquipmentsReset={() => setTurnActions([])}/>}

            {/* Player Turn Actions */}
            <GameTurnActionsPartial turnActions={turnActions}
                                    applyActions={onApplyAction}/>

            {/* Game Round */}
            <GameRoundPartial isVisible={isPlaying}
                              delay={DELAY + 1500}
                              round={round}/>
        </Box>
    );
};

export default GamePartial;
