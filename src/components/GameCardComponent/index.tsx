import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {Box, Image} from "grommet";

import {TWeaponDto} from "../../types/TWeapon";
import {TItemDto} from "../../types/TItem";

import {colors} from "../../styles/theme";

import SoundContext from "../../contexts/SoundContext";

import GameCardOverlayPartial from "./Partials/GameCardOverlayPartial";
import GameCardIndexPartial from "./Partials/GameCardIndexPartial";
import GameCardToolTipPartial from "./Partials/GameCardToolTipPartial";

import ITEMS from "../../game/Items";
import WEAPONS from "../../game/Weapons";

const SIZE = "150px";

interface Props {
    itemOrWeapon: TItemDto | TWeaponDto
    index: number
    select: (itemOrWeapon: TItemDto | TWeaponDto) => void

    size?: string

    // Triggers
    resetSelection: boolean
}

const GameCardComponent: FC<Props> = ({itemOrWeapon, index, size = SIZE, select, resetSelection}) => {
    const {playEffect} = useContext(SoundContext);

    const [isHovered, setHovered] = useState<boolean>(false);
    const [isSelected, setSelected] = useState<boolean>(false);

    const onClick = useCallback(() => {
        setSelected(!isSelected);
        select(itemOrWeapon);
        playEffect("button");
    }, [setSelected, isSelected, select, playEffect])

    useEffect(() => setSelected(false), [resetSelection])

    const equipment = ITEMS.hasOwnProperty(itemOrWeapon.name) ? ITEMS[itemOrWeapon.name] : WEAPONS[itemOrWeapon.name];
    const color = isSelected ? colors.gold : (isHovered ? colors.medium : colors.dark);

    return (
        <Box width={size}
             height={size}
             align="center"
             justify="center"
             onMouseOver={() => setHovered(true)}
             onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}
             onClick={onClick}
             style={{
                 position: "relative",
                 border: "solid 5px " + color,
                 transition: "all 0.1s ease",
                 borderRadius: "0.25rem",
                 cursor: "cursor",
                 bottom: isHovered || isSelected ? 0 : -20
             }}
        >
            {/* ToolTip */}
            <GameCardToolTipPartial isVisible={isHovered} equipment={equipment} size={size}/>

            {/* Index Overlay */}
            {index >= 0 && <GameCardIndexPartial index={index}/>}

            {/* Overlay */}
            <GameCardOverlayPartial size={size} color={color}/>

            {/* Image */}
            <Image src={equipment.image}
                   style={{
                       width: `calc(${size} - 9px)`,
                       height: `calc(${size} - 9px)`,
                       borderRadius: 1
                   }}/>
        </Box>
    );
}

export default GameCardComponent;
