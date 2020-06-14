import React, {FC, useContext} from 'react';
import {Box, Image} from "grommet";
import styled from "styled-components";

import {colors} from "../../../../styles/theme";

import TMenuTabs from "../../../../types/TMenuTabs";

import PlayerContext from "../../../../contexts/PlayerContext";
import GameMasterContext from "../../../../contexts/GameMasterContext";

import {changeColorBrightness} from "../../../../services/ColorService";

import PlayerStatsPartial from "./PlayerStatsPartial";

import ButtonComponent from "../../../../components/ButtonComponent";

import logoSmall from "../../../../assets/images/logo/logo_small.png";

const SNavigationBar = styled(Box)<{ disabled: boolean }>`
    background: ${({disabled}) => disabled ? colors.beige : colors.gold};

    :hover {
        background: ${({disabled}) => disabled ? colors.beige : changeColorBrightness(colors.gold, -20)};
    }
`

const MENU_TABS: Array<TMenuTabs> = ["Fähigkeiten", "Inventar", "Ausrüstung"];

interface Props {
    menuAnimationDuration: number
}

const NavigationBarPartial: FC<Props> = ({menuAnimationDuration}) => {
    const {logout} = useContext(PlayerContext);
    const {menuTab, setMenuTab, viewMode} = useContext(GameMasterContext);

    const isVisible = viewMode !== "game";

    return (
        <SNavigationBar animation={isVisible ? "fadeIn" : "fadeOut"}
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
                 margin="85% 0 0"
                 align="center"
            >
                {/* Player Stats */}
                <PlayerStatsPartial/>

                {/* Tabs */}
                <Box width="90%">
                    {MENU_TABS.map(tab =>
                        <ButtonComponent key={"MenuTab-" + tab}
                                         color="white"
                                         background={menuTab === tab ? "gold" : "medium"}
                                         hoverColor={menuTab === tab ? changeColorBrightness(colors.gold, -20) : "dark"}
                                         fontSize="1.25rem"
                                         padding="0.75rem 1rem"
                                         margin={{bottom: "1rem"}}
                                         onClick={() => setMenuTab(tab)}
                        >
                            {tab}
                        </ButtonComponent>)}
                </Box>

                {/* Close Button */}
                <Box width="90%" margin={{top: "60%"}}>
                    <ButtonComponent color="dark"
                                     background="light"
                                     hoverColor={changeColorBrightness(colors.light, -20)}
                                     fontSize="1.25rem"
                                     padding="0.75rem 1rem"
                                     margin={{bottom: "1rem"}}
                                     onClick={logout}
                    >
                        Abmelden
                    </ButtonComponent>
                    <ButtonComponent color="dark"
                                     background="light"
                                     hoverColor={changeColorBrightness(colors.light, -20)}
                                     fontSize="1.25rem"
                                     padding="0.75rem 1rem"
                                     onClick={() => setMenuTab(null)}
                    >
                        Zurück
                    </ButtonComponent>
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
