import React, {FC} from 'react';
import {Box, Image} from "grommet";
import styled from "styled-components";

import {colors} from "../../../styles/theme";

import {changeColorBrightness} from "../../../services/ColorService";

import logoSmall from "../../../assets/logo/logo_small.png"

const SNavigationbar = styled(Box)`
    background: ${colors.gold};

    :hover {
        background: ${changeColorBrightness(colors.gold, 20)};
    }
`

interface Props {
    delay: number
    menuIsOpen: boolean
    openMenu: () => void
}

const NavigationBarPartial: FC<Props> = ({delay, menuIsOpen, openMenu}) => (
    <SNavigationbar
        height="120%"
        width="12rem"
        background="gold"
        align="center"
        justify="end"
        onClick={openMenu}
        style={{
            position: "absolute",
            top: menuIsOpen ? -5 : "-95%",
            left: 50,
            transition: "top 2s ease-in-out, background 0.25s ease",
            clipPath: "polygon(100% 0, 100% 100%, 50% 95%, 0 100%, 0 0)",
            cursor: "pointer",
            border: "solid white 3px",
            boxShadow: "inset 0px 0px 53px 20px rgba(255,255,255,0.2)",
            zIndex: 10
        }}
    >
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
export default NavigationBarPartial;
