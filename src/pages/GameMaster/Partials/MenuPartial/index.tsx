import React, {FC, useContext} from 'react';
import {Box} from "grommet";

import {colors} from "../../../../styles/theme";

import GameMasterContext from "../../../../contexts/GameMasterContext";

import {changeColorBrightness} from "../../../../services/ColorService";

import SkillTabPartial from "./SkillTabPartial";
import InventarTabPartial from "./InventarTabPartial";
import EquipmentTabPartial from "./EquipmentTabPartial";

const CLIP_PATH = "polygon(41% 1%, 96% 0, 99% 2%, 99% 52%, 100% 98%, 96% 100%, 2% 100%, 0 93%, 0 4%, 2% 0)";

interface Props {
    menuAnimationDuration: number
}

const MenuPartial: FC<Props> = ({menuAnimationDuration}) => {
    const {menuTab} = useContext(GameMasterContext);
    
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
            {/* Tabs */}
            <Box width="100%"
                 height="100%"
                 background={changeColorBrightness(colors.gold, 20)}
                 pad="2.5% 2.5% 2.5% calc(5% + 200px)"
                 style={{
                     borderRadius: "1rem",
                     clipPath: CLIP_PATH,
                     boxShadow: "rgb(162, 137, 76) 0px 0px 20px 20px inset"
                 }}
            >
                <Box animation={menuTab != null ? "fadeIn" : "fadeOut"}
                     width="100%"
                     height="100%"
                >
                    <Box width="100%"
                         height="100%"
                         align="center"
                         justify="center"
                         background="white"
                         style={{
                             position: "relative",
                             borderRadius: "1rem",
                             clipPath: CLIP_PATH
                         }}
                    >
                        {menuTab === "Fähigkeiten" && <SkillTabPartial/>}
                        {menuTab === "Inventar" && <InventarTabPartial/>}
                        {menuTab === "Ausrüstung" && <EquipmentTabPartial/>}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MenuPartial;
