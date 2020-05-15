import React, {FC, useState} from 'react';
import {Box} from "grommet";

import TEnemy from "../../types/TEnemy";

import "./style.css";
import {colors} from "../../styles/theme";

import {changeColorBrightness} from "../../services/ColorService";

const SIZE = "75px";
const INNER_SIZE = "85%";

interface Props {
    enemy: TEnemy
}

// TODO: Add Tooltip
const EnemyComponent: FC<Props> = ({enemy}) => {
    const [hovered, setHover] = useState<boolean>(false);

    return (
        <Box
            className={hovered ? "shine" : ""}
            width={SIZE}
            height={SIZE}
            background={changeColorBrightness(colors.gold, -20)}
            justify="center"
            align="center"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onMouseOver={() => setHover(true)}
            style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "10px"
            }}
        >
            <Box
                width={INNER_SIZE}
                height={INNER_SIZE}
                justify="center"
                background="gold"
                style={{
                    borderRadius: "5px",
                    color: "white",
                    textAlign: "center"
                }}
            >
                {enemy.name}
            </Box>
        </Box>
    )
}

export default EnemyComponent;
