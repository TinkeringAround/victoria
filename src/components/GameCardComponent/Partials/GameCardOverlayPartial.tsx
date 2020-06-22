import React, {FC} from 'react';
import {Box} from "grommet";

import {hexToRgbA} from "../../../services/ColorService";

const OVERLAY_POSITION = -5;

interface Props {
    size: string
    color: string
}

const GameCardOverlayPartial: FC<Props> = ({size, color}) =>
    <Box width={size}
         height={size}
         background={hexToRgbA(color, "0.2")}
         style={{
             position: "absolute",
             zIndex: 2,
             top: OVERLAY_POSITION,
             left: OVERLAY_POSITION,
             maxWidth: size,
             borderRadius: "0.25rem"
         }}/>

export default GameCardOverlayPartial;
