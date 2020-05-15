import React, {FC, useContext} from 'react';
import {Box} from "grommet";

import {colors} from "../../../styles/theme";

import GameMasterContext from "../../../contexts/GameMasterContext";

import {changeColorBrightness} from "../../../services/ColorService";

import ButtonComponent from "../../../components/ButtonComponent";
import IconComponent from "../../../components/IconComponent";

interface Props {
    click: () => void
    visible: boolean
}

const WorldMapPartial: FC<Props> = ({click, visible}) => {
    const {viewMode} = useContext(GameMasterContext);

    return (
        <Box animation={visible ? "fadeIn" : "fadeOut"}
             style={{
                 position: "absolute",
                 bottom: "5%",
                 right: "5%",
                 transition: "all 0.25s ease",
                 opacity: viewMode === "world" ? 0 : 1,
                 zIndex: 4
             }}
        >
            <ButtonComponent color="white"
                             background="gold"
                             hoverColor={changeColorBrightness(colors.gold, -20)}
                             onClick={click}
                             fontSize="1.25rem"
                             padding="0.75rem"
            >
                <IconComponent type="sign"/>
            </ButtonComponent>
        </Box>
    )

}

export default WorldMapPartial;
