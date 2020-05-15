import React, {FC, useContext} from 'react';
import {Box} from "grommet";

import {colors} from "../../../../styles/theme";

import GameMasterContext from "../../../../contexts/GameMasterContext";

import {changeColorBrightness,} from "../../../../services/ColorService";

import SkillTabPartial from "./SkillTabPartial";

import ButtonComponent from "../../../../components/ButtonComponent";

interface Props {
    menuAnimationDuration: number
}

const MenuPartial: FC<Props> = ({menuAnimationDuration}) => {
    const {menuTab, setMenuTab} = useContext(GameMasterContext);

    return (
        <Box
            width="85%"
            height="85%"
            background={changeColorBrightness(colors.gold, -50)}
            pad="2%"
            align="end"
            style={{
                position: "absolute",
                top: menuTab ? "7.5%" : "-95%",
                left: "2.5%",
                zIndex: 8,
                transition: "top " + menuAnimationDuration + "ms ease-in-out",
                clipPath: "polygon(41% 1%, 96% 0, 99% 2%, 99% 52%, 100% 98%, 96% 100%, 2% 100%, 0 93%, 0 4%, 2% 0)",
                boxShadow: "inset 0px 0px 20px 20px " + changeColorBrightness(colors.gold, -20)
            }}
        >
            {/* Content */}
            <Box width="100%"
                 height="100%"
                 background="beige"
                 pad="2.5% 7.5% 2.5% calc(5% + 200px)"
                 style={{
                     clipPath: "polygon(1% 3%, 3% 0, 97% 1%, 99% 5%, 100% 71%, 99% 97%, 96% 99%, 78% 99%, 75% 98%, 73% 99%, 3% 99%, 1% 96%)"
                 }}>
                {/* Tabs */}
                {menuTab === "Fähigkeiten" && <SkillTabPartial/>}
            </Box>

            {/* Close Button */}
            <Box style={{
                position: "absolute",
                top: "8%",
                right: "5%"
            }}>
                <ButtonComponent color="white"
                                 background="red"
                                 hoverColor={changeColorBrightness(colors.red, -50)}
                                 fontSize="1.5rem"
                                 padding="0.5rem 0.75rem"
                                 onClick={() => setMenuTab(null)}>
                    X
                </ButtonComponent>
            </Box>
        </Box>
    );
};

export default MenuPartial;
