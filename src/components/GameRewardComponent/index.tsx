import React, {FC, useState} from 'react';
import {Box, Image} from "grommet";

import {colors} from "../../styles/theme";

import ItemOverlayPartial from "../MenuCardComponent/Partials/ItemOverlayPartial";
import ItemAmountPartial from "../MenuCardComponent/Partials/ItemAmountPartial";

import gold from "../../assets/images/rewards/gold.png";
import exp from "../../assets/images/rewards/exp.png";

const SIZE = "100px";
const IMAGES = {gold: gold, exp: exp}

interface Props {
    type: "gold" | "exp"
    amount: number

    size?: string
}

const GameRewardComponent: FC<Props> = ({size = SIZE, type, amount}) => {
    const [isHovered, setHovered] = useState<boolean>(false);

    const color = isHovered ? colors.medium : colors.dark;

    return (
        <Box width={size}
             height={size}
             margin="1rem"
             align="center"
             justify="center"
             onMouseOver={() => setHovered(true)}
             onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}
             style={{
                 position: "relative",
                 border: "solid 5px " + color,
                 transition: "all 0.05s ease",
                 borderRadius: "0.25rem",
                 cursor: "default"
             }}
        >
            {/* Overlay */}
            <ItemOverlayPartial size={size} color={color}/>

            {/* Amount */}
            {amount != null && <ItemAmountPartial amount={amount} noX/>}

            {/* Image */}
            <Image src={IMAGES[type]}
                   style={{
                       width: `calc(${size} - 9px)`,
                       height: `calc(${size} - 9px)`,
                       borderRadius: 1
                   }}/>
        </Box>
    );
};

export default GameRewardComponent;
