import React, {FC, useEffect, useState} from 'react';
import {Box, Image} from "grommet";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

import {TItem} from "../../types/TItem";
import {TWeapon} from "../../types/TWeapon";

import {colors} from "../../styles/theme";

import ItemOverlayPartial from "./Partials/ItemOverlayPartial";
import ItemAmountPartial from "./Partials/ItemAmountPartial";

const SToolTip = styled(ReactTooltip)`
  width: 150px;
`

const SIZE = "100px";

interface Props {
    itemOrWeapon?: TItem | TWeapon
    amount: number

    size?: string

    selectable?: boolean
    select?: (item: TItem | TWeapon | null) => void
}

const MenuCardComponent: FC<Props> = ({itemOrWeapon = null, amount, size = SIZE, selectable = false, select}) => {
    const [isSelected, setSelected] = useState<boolean>(false);
    const [isHovered, setHovered] = useState<boolean>(false);

    const color = isSelected ? colors.gold : (isHovered ? colors.medium : colors.dark);

    useEffect(() => {
        if (select && selectable) select(isSelected ? itemOrWeapon : null);
    }, [isSelected])

    return (
        <React.Fragment>
            {itemOrWeapon != null &&
            <Box className={isHovered ? "shine" : ""}
                 width={size}
                 height={size}
                 margin="0 1rem"
                 align="center"
                 justify="center"
                 onMouseOver={() => setHovered(true)}
                 onMouseEnter={() => setHovered(true)}
                 onMouseLeave={() => setHovered(false)}
                 onClick={() => {
                     if (selectable) setSelected(!isSelected)
                 }}
                 style={{
                     position: "relative",
                     border: "solid 5px " + color,
                     transition: "all 0.05s ease",
                     borderRadius: "0.25rem",
                     cursor: selectable ? "cursor" : "default"
                 }}
                 data-tip
                 data-for={"Item-" + itemOrWeapon.name}
            >
                {/* ToolTip */}
                <SToolTip id={"Item-" + itemOrWeapon.name}
                          effect="solid"
                          backgroundColor={colors.dark}
                >
                    <Box align="center"
                         justify="center"
                         style={{
                             textAlign: "center"
                         }}>
                        {/* Name */}
                        <h1 style={{
                            margin: "1rem 0",
                            fontSize: "2rem"
                        }}>
                            {itemOrWeapon.name}
                        </h1>

                        {/* Description */}
                        <p style={{
                            margin: "0 0 1rem",
                            fontSize: "1.25rem"
                        }}>
                            {itemOrWeapon.description}
                        </p>

                        {/* Damage / Defence */}
                        {itemOrWeapon.hasOwnProperty("value") &&
                        <p style={{
                            margin: "0.5rem 0",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: colors.gold
                        }}>
                            {(itemOrWeapon.type === "weapon" ? "Schaden   " : "Verteidigung   ") + (itemOrWeapon as TWeapon).value}
                        </p>}
                    </Box>
                </SToolTip>

                {/* Overlay */}
                <ItemOverlayPartial size={SIZE} color={color}/>

                {/* Amount */}
                <ItemAmountPartial amount={amount}/>

                {/* Image */}
                <Image width={size}
                       height={size}
                       src={itemOrWeapon.image}
                       style={{
                           borderRadius: "1rem"
                       }}/>
            </Box>}
        </React.Fragment>
    );
};

export default MenuCardComponent;
