import React, {FC, useState} from 'react';
import {Box, Image} from "grommet";

import TEnemyDto from "../../types/TEnemyDto";

import {colors} from "../../styles/theme";

import {changeColorBrightness, hexToRgbA} from "../../services/ColorService";

import GameEnemyStatsPartial from "./GameEnemyStatsPartial";

import ENEMIES from "../../game/Enemies";

const INNER_SIZE = "calc(100% -10px)";

interface Props {
    enemy: TEnemyDto
    size: number
}

const GameEnemyComponent: FC<Props> = ({enemy, size}) => {
    const [isHovered, setHovered] = useState<boolean>(false);

    const isHealthy = enemy.health > 0;
    const color = isHovered && isHealthy ? colors.gold : colors.dark;
    const healthSize = 0.25 * size;
    const statsHeight = 0.15 * size;

    return (
        <Box width={size + "px"}
             height={size + "px"}
             background={changeColorBrightness(colors.gold, -20)}
             justify="center"
             align="center"
             onMouseEnter={() => setHovered(true)}
             onMouseOver={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}
             style={{
                 position: "relative",
                 border: "solid 5px " + color,
                 borderRadius: "0.25rem"
             }}
        >
            {/* Overlay */}
            <Box animation={isHealthy ? "fadeOut" : "fadeIn"}
                 width="100%"
                 height="100%"
                 background={hexToRgbA(colors.dark, "0.75")}
                 style={{
                     position: "absolute",
                     top: 0,
                     left: 0,
                     zIndex: 10
                 }}/>

            {/* Stats */}
            <GameEnemyStatsPartial healthSize={healthSize}
                                   statsHeight={statsHeight}
                                   health={enemy.health}
                                   enemy={ENEMIES[enemy.name]}/>

            {/* Image */}
            <Box width={INNER_SIZE}
                 height={INNER_SIZE}
                 align="center"
                 justify="center"
                 style={{
                     position: "relative",
                     borderRadius: "5px",
                     color: "white",
                     textAlign: "center"
                 }}
            >
                <Image src={ENEMIES[enemy.name].image}
                       style={{
                           width: "100%",
                           height: "100%",
                           borderRadius: 1
                       }}/>
            </Box>
        </Box>
    )
}

export default GameEnemyComponent;
