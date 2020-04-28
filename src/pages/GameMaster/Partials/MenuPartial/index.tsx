import React, {FC, useContext} from 'react';
import {Box} from "grommet";

import {colors} from "../../../../styles/theme";

import GameMasterContext from "../../../../contexts/GameMasterContext";

import {changeColorBrightness, hexToRgbA,} from "../../../../services/ColorService";

import ButtonComponent from "../../../../components/ButtonComponent";

interface Props {
    menuAnimationDuration: number
}

const MenuPartial: FC<Props> = ({menuAnimationDuration}) => {
    const {menuIsOpen, setMenuIsOpen} = useContext(GameMasterContext);

    return (
        <Box
            width="98%"
            height="95%"
            background={changeColorBrightness(colors.gold, -50)}
            pad="2%"
            align="end"
            style={{
                position: "absolute",
                top: menuIsOpen ? "2.5%" : "-95%",
                left: "1%",
                zIndex: 8,
                transition: "top " + menuAnimationDuration + "ms ease-in-out",
                clipPath: "polygon(41% 1%, 96% 0, 99% 2%, 99% 52%, 100% 98%, 96% 100%, 2% 100%, 0 93%, 0 4%, 2% 0)",
                boxShadow: "inset 0px 0px 20px 20px " + changeColorBrightness(colors.gold, -20)
            }}
        >

            {/* Content */}
            <Box width="100%"
                 height="100%"
                 background="white"
                 pad="2.5% 2.5% 2.5% calc(7.5% + 200px)"
                 style={{
                     clipPath: "polygon(1% 3%, 3% 0, 97% 1%, 99% 5%, 100% 71%, 99% 97%, 96% 99%, 78% 99%, 75% 98%, 73% 99%, 3% 99%, 1% 96%)",
                     boxShadow: "inset 0px 0px 1000px 300px " + hexToRgbA(colors.gold, "0.2")
                 }}>
                
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
                                 onClick={() => setMenuIsOpen(false)}>
                    X
                </ButtonComponent>
            </Box>
        </Box>
    );
};

export default MenuPartial;
