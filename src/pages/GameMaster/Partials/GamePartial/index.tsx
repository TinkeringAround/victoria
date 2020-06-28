import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {Box} from "grommet";
import ReactDice from 'react-dice-complete';

import 'react-dice-complete/dist/react-dice-complete.css'

import {TItemDto} from "../../../../types/TItem";
import {TWeaponDto} from "../../../../types/TWeapon";
import TGameState from "../../../../types/TGameState";
import TGameCondition from "../../../../types/TGameCondition";
import TGameResult from "../../../../types/TGameResult";
import TRewards from "../../../../types/TRewards";
import TPlayer from "../../../../types/TPlayer";

import {colors} from "../../../../styles/theme";

import PlayerContext from "../../../../contexts/PlayerContext";
import GameMasterContext from "../../../../contexts/GameMasterContext";
import SoundContext from "../../../../contexts/SoundContext";

import {shuffle} from "../../../../services/CardService";
import {generateEnemies} from "../../../../services/EnemyService";
import {gainExperience, getPlayerHealth} from "../../../../services/PlayerService";
import {
    getGameStateMutations,
    getPossibleDicePositions,
    mergeRewardsInItems,
    removeUsedEquipments
} from "../../../../services/GameService";

import GameEnemyCirclePartial from "./Partials/GameEnemyCirclePartial";
import GamePlayerPartial from "./Partials/GamePlayerPartial";
import GameTurnActionsPartial from "./Partials/GameTurnActionsPartial";
import GameEquipmentsPartial from "./Partials/GameEquipmentsPartial";
import GameRoundPartial from "./Partials/GameRoundPartial";
import GameEndPartial from "./Partials/GameEndPartial";

import LEVELS from "../../../../game/Levels";
import ENEMIES from "../../../../game/Enemies";
import TGameMutation from "../../../../types/TGameMutation";

const DELAY = 1000;
const STEP_DURATION = 250;
const STEP_DURATION_END_DELAY = 500;
const DICE_SIZE = 120;

interface Props {
    isPlaying: boolean
    onFinished: (playerUpdate: TPlayer) => void
}

const GamePartial: FC<Props> = ({isPlaying, onFinished}) => {
    const {player} = useContext(PlayerContext);
    const {level, region} = useContext(GameMasterContext);
    const {play, playEffect} = useContext(SoundContext);

    const dice = useRef();

    const [gameResult, setGameResult] = useState<TGameResult>(null);
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
            if (condition === "win") setGameResult("win");
            else if (condition === "loose") setGameResult("loose");
            else if (condition === "round") {
                if (dice && dice.current) {
                    const {enemyIndex, enemies} = gameStates[gameStates.length - 1];
                    // @ts-ignore
                    dice.current.rollAll(getPossibleDicePositions(enemies, enemyIndex));
                    playEffect("dice");
                }
            } else {
                setRound(round + 1);
                setRunning(false);
            }
        }, ((gameStates.length) * STEP_DURATION) + STEP_DURATION_END_DELAY);
    }

    const onDiceRollEnd = (diceValue: number) => {
        if (player && gameState) {
            const turnActionsWithDice: Array<TItemDto | TWeaponDto | TGameMutation> = [...turnActions, {
                target: "circle",
                value: diceValue
            }];
            const firstGameStateMutations = getGameStateMutations(player, gameState, turnActionsWithDice);
            const lastGameState = firstGameStateMutations.gameStates[firstGameStateMutations.gameStates.length - 1];
            const currentEnemy = lastGameState.enemies[lastGameState.enemyIndex]

            if (currentEnemy.health > 0) {
                const {gameStates, gameLost} = getGameStateMutations(player, gameState, [...turnActionsWithDice, {
                    target: "player",
                    value: ENEMIES[currentEnemy.name].stats.attack
                }]);
                startGameStateUpdateRoutine(gameStates.slice(gameStates.length - 3, 2), gameLost ? "loose" : "roundEnd");
            } else startGameStateUpdateRoutine([], "roundEnd");
        }
    }

    const onApplyAction = () => {
        if (player && gameState) {
            const {gameStates, gameLost, gameWon} = getGameStateMutations(player, gameState, turnActions);

            if (gameWon) startGameStateUpdateRoutine(gameStates, "win");
            else startGameStateUpdateRoutine(gameStates, gameLost ? "loose" : "round");
        }
    }

    const onLeaveGameEndScreen = (rewards: TRewards | null, experienceGain: number) => {
        if (player && gameState) {
            const {newExperience, newLevel} = gainExperience(player, experienceGain);
            const {newEquipments, newItems} = removeUsedEquipments(player.items, player.equipments, gameState.usedItems);
            let rewardGold = 0;
            let newItemsWithRewards = newItems;

            if (rewards != null) {
                const {gold, items} = rewards;
                rewardGold = gold;
                newItemsWithRewards = mergeRewardsInItems(newItems, items);
            }

            const playerUpdate: TPlayer = {
                ...player,
                level: newLevel,
                experience: newExperience,
                gold: player.gold + rewardGold,
                items: newItemsWithRewards,
                equipments: newEquipments
            }
            onFinished(playerUpdate);
            setGameResult(null);
            setGameState(null);
        }
    }

    useEffect(() => {
        if (isPlaying && player != null && gameState == null) {
            console.log("Initialize Game");
            const newGame = {
                health: getPlayerHealth(player),
                equipments: shuffle(player.equipments),
                usedItems: [],
                enemyIndex: 0,
                enemies: generateEnemies(LEVELS[level].regions[region]),
            }

            setRunning(false);
            setRound(1);
            setGameState(newGame);
        }
    }, [isPlaying, gameState])

    useEffect(() => {
        if (isPlaying) play("game")
    }, [isPlaying])

    return (
        <Box animation={isPlaying ? {type: "fadeIn", delay: DELAY} : "fadeOut"}
             height={window.innerHeight + "px"}
             width={window.innerWidth + "px"}
             background="dark"
             style={{position: "absolute", zIndex: isPlaying ? 600 : -1}}
        >
            {/* Game End Screen */}
            <GameEndPartial result={gameResult} gameState={gameState} onFinish={onLeaveGameEndScreen}/>

            {/* Game Dice */}
            <Box style={{
                position: "absolute",
                right: "10%",
                top: "50%",
                transform: "translateY(-50%)",
                transition: "all 1s ease"
            }}>
                <Box width="100%" height="5rem" align="center" justify="center">
                    <ReactDice
                        numDice={1}
                        ref={dice}
                        rollDone={onDiceRollEnd}
                        margin={0}
                        faceColor={colors.light}
                        dotColor={colors.gold}
                        dieSize={DICE_SIZE}
                        outline
                        outlineColor={colors.gold}
                        disableIndividual
                    />
                </Box>
            </Box>

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
