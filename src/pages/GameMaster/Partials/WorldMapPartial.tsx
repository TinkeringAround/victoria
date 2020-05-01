import React, {FC} from 'react';
import {Box} from "grommet";

import {colors} from "../../../styles/theme";

import {changeColorBrightness} from "../../../services/ColorService";

import ButtonComponent from "../../../components/ButtonComponent";

interface Props {
    worldMapIsOpen: boolean
    click: () => void
}

const WorldMapPartial: FC<Props> = ({worldMapIsOpen, click}) =>
    <Box style={{
        position: "absolute",
        bottom: "5%",
        right: "5%",
        transition: "all 0.25s ease",
        opacity: worldMapIsOpen ? 0 : 1,
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
            Weltkarte
        </ButtonComponent>
    </Box>

export default WorldMapPartial;
