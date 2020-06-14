import React, {FC} from 'react';
import {Box, Image} from "grommet";

import equipments from "../../../../../assets/images/equipments.png";

interface Props {
    isVisible: boolean
    delay: number
}

const GameEquipmentsPartial: FC<Props> = ({isVisible, delay}) =>
    <Box animation={isVisible ? {delay: delay, type: "slideUp", size: "xlarge"} : "fadeOut"}
         width="100%"
         height="200px"
         style={{
             position: "absolute",
             left: 0,
             bottom: 0,
             zIndex: 2
         }}>

        {/* Image */}
        <Image src={equipments}
               style={{
                   objectPosition: "bottom",
                   objectFit: "fill",
                   flex: "1 1 auto",
                   overflow: "hidden"
               }}/>
    </Box>

export default GameEquipmentsPartial;
