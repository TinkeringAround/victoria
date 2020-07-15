import React, {FC, useState} from 'react';
import {Box, Image} from "grommet";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

import TEnemy from "../../types/TEnemy";

import {colors} from "../../styles/theme";

import {changeColorBrightness} from "../../services/ColorService";

const SToolTip = styled(ReactTooltip)`
  width: 150px;
`

const SIZE = "120px";
const INNER_SIZE = "85%";
const STAT_NAMES: { [name: string]: string } = {
    "health": "Leben",
    "attack": "Angriff",
    "armor": "Verteidigung"
}

interface Props {
    enemy: TEnemy
    size?: string
}

const EnemyComponent: FC<Props> = ({enemy, size = SIZE}) => {
    const [isHovered, setHovered] = useState<boolean>(false);

    const color = isHovered ? colors.medium : colors.dark;

    return (
        <Box
            className={isHovered ? "shine" : ""}
            width={size}
            height={size}
            background={changeColorBrightness(colors.gold, -20)}
            justify="center"
            align="center"
            onMouseEnter={() => setHovered(true)}
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                overflow: "hidden",
                border: "solid 5px " + color,
                borderRadius: "0.25rem",
            }}
            data-tip
            data-for={"Enemy-" + enemy.name}
        >
            {/* ToolTip */}
            {isHovered &&
            <SToolTip id={"Enemy-" + enemy.name}
                      place="top"
                      effect="solid"
                      backgroundColor={colors.dark}
            >
                <Box align="center"
                     justify="center"
                     style={{textAlign: "center"}}
                >
                    {/* Name */}
                    <h1 style={{margin: "0.5rem 0", fontSize: "2rem"}}>
                        {enemy.name}
                    </h1>

                    {/* Stats */}
                    {Object.keys(enemy.stats).map((stat, index) => (
                        <React.Fragment key={"EnemyStat" + stat}>
                            {STAT_NAMES.hasOwnProperty(stat) ?
                                <p style={{
                                    margin: "0.5rem 0",
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    color: colors.gold
                                }}>
                                    {STAT_NAMES[stat] + "   " + (Object.values(enemy.stats))[index]}
                                </p> : <React.Fragment/>}
                        </React.Fragment>
                    ))}
                </Box>
            </SToolTip>}

            {/* Image */}
            <Box
                width={INNER_SIZE}
                height={INNER_SIZE}
                align="center"
                justify="center"
                background="gold"
                style={{
                    position: "relative",
                    borderRadius: "5px",
                    color: "white",
                    textAlign: "center"
                }}
            >
                <Image src={enemy.image}
                       style={{
                           width: `calc(${size} - 9px)`,
                           height: `calc(${size} - 9px)`,
                           borderRadius: 1
                       }}/>
            </Box>
        </Box>
    )
}

export default EnemyComponent;
