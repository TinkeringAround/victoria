import React, {FC, useContext} from 'react';
import {Box} from "grommet";

import {colors} from "../../../../styles/theme";

import GameMasterContext from "../../../../contexts/GameMasterContext";

import {changeColorBrightness, hexToRgbA,} from "../../../../services/ColorService";

import SkillTabPartial from "./SkillTabPartial";
import AlchemyTabPartial from "./AlchemyTabPartial";

import ButtonComponent from "../../../../components/ButtonComponent";

interface Props {
    menuAnimationDuration: number
}

const MenuPartial: FC<Props> = ({menuAnimationDuration}) => {
    const {menuTab, setMenuTab} = useContext(GameMasterContext);

    return (
        <Box
            width="90%"
            height="85%"
            background="white"
            pad="2%"
            align="end"
            style={{
                position: "absolute",
                top: menuTab ? "7.5%" : "-95%",
                left: "5%",
                zIndex: 8,
                transition: "top " + menuAnimationDuration + "ms ease-in-out",
                clipPath: "polygon(41% 1%, 96% 0, 99% 2%, 99% 52%, 100% 98%, 96% 100%, 2% 100%, 0 93%, 0 4%, 2% 0)",
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
                 pad="2.5% 5% 2.5% calc(5% + 200px)"
                 style={{
                     borderRadius: "1rem",
                 }}>
                {menuTab === "Fähigkeiten" && <SkillTabPartial/>}

                {menuTab === "Alchemie" && <AlchemyTabPartial/>}
            </Box>

            {/* Close Button */}
            <Box style={{
                position: "absolute",
                top: "6%",
                right: "3%"
            }}>
                <ButtonComponent color="white"
                                 background="medium"
                                 hoverColor="dark"
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
