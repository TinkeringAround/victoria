import React, {FC} from 'react';
import {Box} from "grommet";

import {colors} from "../../../../../styles/theme";

import {changeColorBrightness} from "../../../../../services/ColorService";

import ButtonComponent from "../../../../../components/ButtonComponent";

interface Props {
    isVisible: boolean
    onClick: any
}

const CombinePartial: FC<Props> = ({isVisible, onClick}) =>
    <Box animation={isVisible ? "fadeIn" : "fadeOut"}
         direction="row"
         width="150px"
         align="center"
         justify="end"
         style={{
             position: "absolute",
             bottom: "1rem",
             right: "5.5%"
         }}
    >
        <ButtonComponent fontSize="1rem" padding="0.5rem"
                         color={colors.white}
                         background={colors.red}
                         hoverColor={changeColorBrightness(colors.red, -20)}
                         onClick={onClick}
        >
            Kombinieren
        </ButtonComponent>
    </Box>

export default CombinePartial;
