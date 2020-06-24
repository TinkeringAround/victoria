import React, {FC} from 'react';
import {Box} from "grommet";

import TEnemyDto from "../../../../../../types/TEnemyDto";

import {colors} from "../../../../../../styles/theme";

import {getCircleRotation, getEnemyPosition, getEnemyRotation} from "../../../../../../services/EnemyService";

import GameEnemyComponent from "../../../../../../components/GameEnemyComponent";

import GameEnemyCircleLinePartial from "./GameEnemyCircleLinePartial";

const MIN_SIZE = 600;
const MAX_SIZE = 800;
const MULTIPLIER = 0.5;
const ENEMY_MULTIPLIER = 0.2;
const CIRCLE_TOP_TOLERANCE = 25;

interface Props {
    isVisible: boolean

    enemies: Array<TEnemyDto>
    activeEnemyIndex: number
}

const GameEnemyCirclePartial: FC<Props> = ({isVisible, enemies, activeEnemyIndex}) => {

    const calculatedSize = window.innerWidth * MULTIPLIER;
    const size = calculatedSize >= MIN_SIZE ? (calculatedSize > MAX_SIZE ? MAX_SIZE : calculatedSize) : MIN_SIZE;
    const enemySize = size * ENEMY_MULTIPLIER;
    const circleTop = size - (size / 2 + enemySize / 2 + CIRCLE_TOP_TOLERANCE);
    const circleLeft = (window.innerWidth - size) / 2;
    const color = colors.dark;

    return (
        <Box width={size + "px"}
             height={size + "px"}
             background="medium"
             style={{
                 position: "absolute",
                 top: isVisible ? `-${circleTop}px` : "-100%",
                 left: `${circleLeft}px`,
                 clipPath: "circle(50% at 50% 50%)",
                 zIndex: 5,
                 transition: `all 1s ease`,
                 transform: `rotate(${getCircleRotation(activeEnemyIndex, enemies.length)}deg)`
             }}
        >
            {/* Enemies */}
            <Box width={size + "px"}
                 height={size + "px"}
                 style={{position: "relative"}}
            >
                {enemies.map((enemy, index) => {
                    const {top, left} = getEnemyPosition(index, enemies.length, enemySize, size);

                    return (
                        <Box key={"GameEnemy" + enemy.name + index}
                             style={{
                                 position: "absolute", top: top, left: left,
                                 transition: `all 1s ease`,
                                 transform: `rotate(${getEnemyRotation(activeEnemyIndex, enemies.length)}deg)`
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
