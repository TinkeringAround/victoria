import React, {FC} from 'react';
import {Box, Text} from "grommet";

import TEnemy from "../../types/TEnemy";

import {colors} from "../../styles/theme";

import IconComponent from "../IconComponent";

import ENEMIES from "../../game/Enemies";

interface Props {
    healthSize: number
    statsHeight: number

    health: number
    enemy: TEnemy
}

const GameEnemyStatsPartial: FC<Props> = ({healthSize, statsHeight, health, enemy}) => {
    return (
        <React.Fragment>
            {/* Health */}
            <Box width={healthSize + "px"}
                 height={healthSize + "px"}
                 align="center"
                 justify="center"
                 style={{
                     position: "absolute",
                     top: healthSize * 0.25,
                     right: healthSize * 0.25,
                     fontSize: "2.5rem",
                     color: colors.red,
                     zIndex: 1
                 }}>
                <Text color="light"
                      style={{
                          position: "absolute",
                          left: "50%",
                          transform: "translateX(-50%)",
                          fontWeight: "bold",
                          zIndex: 5
                      }}>
                    {health}
                </Text>
                <IconComponent type="heart"/>
            </Box>

            {/* Damage and Defence */}
            <Box width="100%"
                 height={statsHeight + "px"}
                 direction="row"
                 align="center"
                 justify="center"
                 style={{
                     position: "absolute",
                     left: 0,
                     bottom: 5,
                     fontSize: "85%",
                     color: colors.gold,
                     zIndex: 1
                 }}>
                {/* Damage */}
                <Box width="50%" height="100%" direction="row" align="center" justify="center">
                    <IconComponent type="sword"/>
                    <span style={{
                        fontSize: "100%",
                        fontWeight: "bold",
                        marginLeft: "5px"
                    }}>
                        {ENEMIES[enemy.name].stats.attack}
                    </span>
                </Box>

                {/* Defence */}
                <Box width="50%" height="100%" direction="row" align="center" justify="center">
                    <IconComponent type="shield"/>
                    <span style={{
                        fontSize: "100%",
                        fontWeight: "bold",
                        marginLeft: "5px"
                    }}>
                        {ENEMIES[enemy.name].stats.armor}
                    </span>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default GameEnemyStatsPartial;
