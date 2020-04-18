import React, {FC, useContext} from 'react';
import {Box, Image} from "grommet";
import styled from "styled-components";

import {colors} from "../../../styles/theme";

import GameMasterContext from "../../../contexts/GameMasterContext";

import {changeColorBrightness, hexToRgbA} from "../../../services/ColorService";

import logoSmall from "../../../assets/logo/logo_small.png"

const SNavigationbar = styled(Box)<{ disabled: boolean }>`
    background: ${colors.gold};

    :hover {
        background: ${({disabled}) => disabled ? colors.gold : changeColorBrightness(colors.gold, -20)};
    }
`

interface Props {
    menuAnimationDuration: number
}

const NavigationBarPartial: FC<Props> = ({menuAnimationDuration}) => {
    const {menuIsOpen, setMenuIsOpen} = useContext(GameMasterContext);

    return (
        <SNavigationbar
            disabled={menuIsOpen !== false}
            height="120%"
            width="200px"
            align="center"
            justify="between"
            onClick={() => {
                if (!menuIsOpen) setMenuIsOpen("Fähigkeiten");
            }}
            style={{
                position: "absolute",
                top: menuIsOpen ? -5 : "-95%",
                left: "7.5%",
                transition: "top " + menuAnimationDuration + "ms ease-in-out, background 0.25s ease",
                clipPath: "polygon(100% 0, 100% 100%, 50% 95%, 0 100%, 0 0)",
                cursor: menuIsOpen ? "default" : "pointer",
                border: `solid ${colors.white} 5px`,
                boxShadow: "inset 0px 0px 50px 20px " + hexToRgbA(colors.white, "0.1"),
                zIndex: 10
            }}
        >
            {/* TODO: Tab Depending Items */}
            <Box width="90%"/>

            {/* Logo */}
            <Box width="90%"
                 align="center"
                 justify="center"
                 margin={{bottom: "5rem"}}
            >
                <Image src={logoSmall} fit="contain"/>
            </Box>
        </SNavigationbar>
    );
}
export default NavigationBarPartial;
