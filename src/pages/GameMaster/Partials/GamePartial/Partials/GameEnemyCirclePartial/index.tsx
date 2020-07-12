import React, {FC} from 'react';
import {Box} from "grommet";

import TGameState from "../../../../../../types/TGameState";

import {colors} from "../../../../../../styles/theme";

import {
    getCircleRotation,
    getEnemyPosition,
    getEnemyRotation,
    getInnerCircleRotation
} from "../../../../../../services/EnemyService";
import {hexToRgbA} from "../../../../../../services/ColorService";

import GameEnemyComponent from "../../../../../../components/GameEnemyComponent";

import GameEnemyCircleLinePartial from "./GameEnemyCircleLinePartial";

const MIN_SIZE = 600;
const MAX_SIZE = 800;
const MULTIPLIER = 0.5;
const ENEMY_MULTIPLIER = 0.2;
const CIRCLE_TOP_TOLERANCE = 25;

interface Props {
    gameState: TGameState | null
}

const GameEnemyCirclePartial: FC<Props> = ({gameState}) => {
    const circleIndex = gameState ? gameState.enemyIndex : 0;
    const circlePieces = gameState ? gameState.enemies.length : 0;

    const calculatedSize = window.innerWidth * MULTIPLIER;
    const size = calculatedSize >= MIN_SIZE ? (calculatedSize > MAX_SIZE ? MAX_SIZE : calculatedSize) : MIN_SIZE;
    const enemySize = size * ENEMY_MULTIPLIER;
    const circleTop = size - (size / 2 + enemySize / 2 + CIRCLE_TOP_TOLERANCE);
    const circleLeft = (window.innerWidth - size) / 2;
    const color = hexToRgbA(colors.gold, "0.2");

    return (
        <Box width={size + "px"}
             height={size + "px"}
             background="medium"
             style={{
                 position: "absolute",
                 top: `-${circleTop}px`,
                 left: `${circleLeft}px`,
                 clipPath: "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)",
                 zIndex: 5,
                 transition: `all 1s ease`,
                 transform: `rotate(${getCircleRotation(circleIndex, circlePieces)}deg)`
             }}
        >
            {/* Inner Circle */}
            <Box width="80%"
                 height="80%"
                 background="light"
                 style={{
                     position: "absolute",
                     top: "10%",
                     left: "10%",
                     zIndex: -1,
                     clipPath: " polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                     transition: `all 0.5s ease`,
                     transform: `rotate(${getInnerCircleRotation(circleIndex, circlePieces)}deg)`
                 }}/>

            {/* Enemies */}
            <Box width={size + "px"}
                 height={size + "px"}
                 style={{position: "relative"}}
            >
                {gameState != null && gameState.enemies.map((enemy, index) => {
                    const {top, left} = getEnemyPosition(index, circlePieces, enemySize, size);

                    return (
                        <Box key={"GameEnemy" + enemy.name + index}
                             style={{
                                 position: "absolute", top: top, left: left,
                                 transition: `all 1s ease`,
                                 transform: `rotate(${getEnemyRotation(circleIndex, circlePieces)}deg)`
                             }}>
                            <GameEnemyComponent enemy={enemy} size={enemySize}/>
                        </Box>
                    )
                })}
            </Box>

            {/* Drawing */}
            <GameEnemyCircleLinePartial size={size} color={color}/>
        </Box>
    );
};

export default GameEnemyCirclePartial;
