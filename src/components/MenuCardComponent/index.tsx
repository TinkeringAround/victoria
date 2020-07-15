import React, {FC, useState} from 'react';
import {Box, Image} from "grommet";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

import {TItem} from "../../types/TItem";
import {TWeapon} from "../../types/TWeapon";

import {colors} from "../../styles/theme";

import ItemOverlayPartial from "./Partials/ItemOverlayPartial";
import ItemAmountPartial from "./Partials/ItemAmountPartial";
import {generateText} from "../../services/CardService";

const SToolTip = styled(ReactTooltip)`
  width: 150px;
`

const SIZE = "100px";

interface Props {
    itemOrWeapon: TItem | TWeapon
    amount: number | null

    size?: string

    mode?: 1 | 2 | 3

    enabledToolTip?: boolean
    selectable?: boolean
    selected?: boolean
    select?: ((item: TItem | TWeapon) => void) | null

    toolTipPosition?: "top" | "right"
    noAnimation?: boolean
}

const MenuCardComponent: FC<Props> = ({itemOrWeapon, amount, size = SIZE, mode = 1, enabledToolTip = true, selectable = false, selected = false, select, noAnimation = false, toolTipPosition}) => {
    const [isHovered, setHovered] = useState<boolean>(false);

    const color = selected ? colors.gold : (isHovered ? colors.medium : colors.dark);

    const margin = mode === 1 || mode === 3 ? "1rem" : "10px";
    const toolTipPlace = toolTipPosition ? toolTipPosition : (mode === 1 || mode === 3 ? "top" : "right");
    const toolTipId = itemOrWeapon != null ? "Item-" + itemOrWeapon.name : "";

    return (
        <React.Fragment>
            {itemOrWeapon != null &&
            <Box className={isHovered && !noAnimation ? "shine" : ""}
                 width={size}
                 height={size}
                 margin={margin}
                 align="center"
                 justify="center"
                 onMouseOver={() => setHovered(true)}
                 onMouseEnter={() => setHovered(true)}
                 onMouseLeave={() => setHovered(false)}
                 onClick={() => {
                     if (selectable && select) select(itemOrWeapon);
                 }}
                 style={{
                     position: "relative",
                     border: "solid 5px " + color,
                     transition: "all 0.05s ease",
                     borderRadius: "0.25rem",
                     cursor: selectable ? "cursor" : "default"
                 }}
                 data-tip
                 data-for={toolTipId}
            >
                {/* ToolTip */}
                {enabledToolTip &&
                isHovered &&
                <SToolTip id={toolTipId}
                          place={toolTipPlace}
                          effect="solid"
                          backgroundColor={colors.dark}
                >
                    <Box align="center"
                         justify="center"
                         style={{textAlign: "center"}}>
                        {/* Name */}
                        <h1 style={{
                            margin: "0.5rem 0",
                            fontSize: "2rem"
                        }}>
                            {itemOrWeapon.name}
                        </h1>

                        {/* Description */}
                        {mode === 1 &&
                        <p style={{
                            margin: "0.5rem 0",
                            fontSize: "1.35rem",
                            lineHeight: "1.25rem",
                        }}>
                            {itemOrWeapon.description}
                        </p>}

                        {/* Damage / Defence / Effect */}
                        {generateText(itemOrWeapon) !== "" &&
                        <p style={{
                            margin: "0.5rem 0",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: colors.gold
                        }}>
                            {generateText(itemOrWeapon)}
                        </p>}
                    </Box>
                </SToolTip>}

                {/* Overlay */}
                <ItemOverlayPartial size={size} color={color}/>

                {/* Amount */}
                {amount != null && <ItemAmountPartial amount={amount}/>}

                {/* Image */}
                <Image src={itemOrWeapon.image}
                       style={{
                           width: `calc(${size} - 9px)`,
                           height: `calc(${size} - 9px)`,
                           borderRadius: 1
                       }}/>
            </Box>}
        </React.Fragment>
    );
}

export default MenuCardComponent;
