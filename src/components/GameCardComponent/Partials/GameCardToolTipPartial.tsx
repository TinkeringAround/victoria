import React, {FC} from 'react';
import {Box} from "grommet";

import {TWeapon} from "../../../types/TWeapon";
import {TItem} from "../../../types/TItem";

import {colors} from "../../../styles/theme";

import {generateText} from "../../../services/CardService";

interface Props {
    isVisible: boolean
    equipment: TItem | TWeapon
    size: string
}

const GameCardToolTipPartial: FC<Props> = ({isVisible, equipment, size}) =>
    <Box animation={isVisible ? {type: "fadeIn", duration: 250} : {type: "fadeOut", duration: 100}}
         align="center"
         justify="center"
         style={{
             position: "absolute",
             bottom: size,
             zIndex: 5,
             textAlign: "center"
         }}>

        {/* Name */}
        <h1 style={{
            margin: "0.5rem 0",
            fontSize: "2rem"
        }}>
            {equipment.name}
        </h1>

        <p style={{
            margin: "0.5rem 0",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: colors.gold
        }}>
            {generateText(equipment)}
        </p>
    </Box>

export default GameCardToolTipPartial;
