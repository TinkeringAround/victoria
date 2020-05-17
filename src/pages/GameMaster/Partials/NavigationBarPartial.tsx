import React, {FC, useContext} from 'react';
import {Box, Heading, Image} from "grommet";
import styled from "styled-components";

import {colors} from "../../../styles/theme";

import TMenuTabs from "../../../types/TMenuTabs";

import PlayerContext from "../../../contexts/PlayerContext";
import GameMasterContext from "../../../contexts/GameMasterContext";

import {changeColorBrightness} from "../../../services/ColorService";

import logoSmall from "../../../assets/logo/logo_small.png"

import ButtonComponent from "../../../components/ButtonComponent";

const SNavigationBar = styled(Box)<{ disabled: boolean }>`
    background: ${({disabled}) => disabled ? colors.beige : colors.gold};

    :hover {
        background: ${({disabled}) => disabled ? colors.beige : changeColorBrightness(colors.gold, -20)};
    }
`

const MENU_TABS: Array<TMenuTabs> = ["Fähigkeiten", "Alchemie", "Abmelden"];

interface Props {
    menuAnimationDuration: number
}

const NavigationBarPartial: FC<Props> = ({menuAnimationDuration}) => {
    const {logout} = useContext(PlayerContext);
    const {menuTab, setMenuTab} = useContext(GameMasterContext);

    return (
        <SNavigationBar
            disabled={menuTab !== null}
            height="120%"
            width="200px"
            align="center"
            justify="between"
            onClick={() => {
                if (!menuTab) setMenuTab("Fähigkeiten");
            }}
            style={{
                position: "absolute",
                top: menuTab ? -5 : "-95%",
                left: "12.5%",
                transition: "top " + menuAnimationDuration + "ms ease-in-out, background " + (menuTab ? menuAnimationDuration + "ms ease-in-out" : "0.25s ease"),
                clipPath: "polygon(100% 0, 100% 100%, 50% 95%, 0 100%, 0 0)",
                cursor: menuTab ? "default" : "pointer",
                border: `solid ${colors.white} 5px`,
                zIndex: 10
            }}
        >
            {/* Tabs */}
            <Box width="100%"
                 margin="100%"
                 align="center"
            >
                <Box height="3.5rem"
                     width="100%"
                     background="medium"
                     pad="0.75rem 1rem"
                     margin={{bottom: "3rem"}}
                >
                    <Heading
                        size="1.75rem"
                        margin="0"
                        color="white"
                        textAlign="center"
                    >
                        {menuTab}
                    </Heading>
                </Box>

                <Box width="90%">
                    {MENU_TABS.map(tab =>
                        <ButtonComponent key={"MenuTab-" + tab}
                                         color="white"
                                         background="medium"
                                         hoverColor="dark"
                                         fontSize="1.25rem"
                                         padding="0.75rem 1rem"
                                         margin={{bottom: "2rem"}}
                                         onClick={() => {
                                             if (tab === "Abmelden") logout();
                                             else setMenuTab(tab);
                                         }}
                        >
                            {tab}
                        </ButtonComponent>)}
                </Box>
            </Box>

            {/* Logo */}
            <Box width="90%"
                 align="center"
                 justify="center"
                 margin={{bottom: "5rem"}}
            >
                <Image src={logoSmall} fit="contain"/>
            </Box>
        </SNavigationBar>
    );
}
export default NavigationBarPartial;
