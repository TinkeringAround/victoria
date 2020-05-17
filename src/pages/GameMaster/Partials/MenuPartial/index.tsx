import React, {FC, useContext} from 'react';
import {Box} from "grommet";

import {colors} from "../../../../styles/theme";

import GameMasterContext from "../../../../contexts/GameMasterContext";

import {changeColorBrightness, hexToRgbA,} from "../../../../services/ColorService";

import SkillTabPartial from "./SkillTabPartial";
import AlchemyTabPartial from "./AlchemyTabPartial";

const CLIP_PATH = "polygon(41% 1%, 96% 0, 99% 2%, 99% 52%, 100% 98%, 96% 100%, 2% 100%, 0 93%, 0 4%, 2% 0)";

interface Props {
    menuAnimationDuration: number
}

const MenuPartial: FC<Props> = ({menuAnimationDuration}) => {
    const {menuTab, setMenuTab} = useContext(GameMasterContext);

    return (
        <Box
            width="80%"
            height="85%"
            background="white"
            pad="1rem"
            align="end"
            style={{
                position: "absolute",
                top: menuTab ? "7.5%" : "-95%",
                left: "10%",
                zIndex: 8,
                transition: "top " + menuAnimationDuration + "ms ease-in-out",
                clipPath: CLIP_PATH,
                borderRadius: "2rem"
            }}
        >
            {/* Shadow */}
            <Box width="50%"
                 height="100%"
                 background={hexToRgbA(colors.black, "0.02")}
                 style={{
                     position: "absolute",
                     top: 0,
                     left: 0,
                     borderTopLeftRadius: "2rem",
                     borderBottomLeftRadius: "2rem",
                     clipPath: "polygon(0 0, 38% 0, 66% 100%, 0% 100%)",
                     zIndex: 8
                 }}/>

            {/* Tabs */}
            <Box width="100%"
                 height="100%"
                 background={changeColorBrightness(colors.gold, 20)}
                 pad="2.5% 2.5% 2.5% calc(5% + 200px)"
                 style={{
                     borderRadius: "1rem",
                     clipPath: CLIP_PATH
                 }}>
                <Box animation={menuTab != null ? "fadeIn" : "fadeOut"}
                     width="100%"
                     height="100%"
                >
                    {menuTab === "Fähigkeiten" && <SkillTabPartial clipPath={CLIP_PATH}/>}
                    {menuTab === "Alchemie" && <AlchemyTabPartial clipPath={CLIP_PATH}/>}
                </Box>
            </Box>
        </Box>
    );
};

export default MenuPartial;
