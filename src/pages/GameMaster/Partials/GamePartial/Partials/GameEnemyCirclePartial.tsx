import React, {FC} from 'react';
import {Box} from "grommet";

import TEnemyDto from "../../../../../types/TEnemyDto";

interface Props {
    isVisible: boolean
    delay: number

    enemies: Array<TEnemyDto>
}

const GameEnemyCirclePartial: FC<Props> = ({isVisible, delay, enemies}) => {

    console.log("ENemies", enemies)

    return (
        <Box animation={isVisible ? {delay: delay, type: "slideDown", size: "xlarge"} : "fadeOut"}
             width="50%" height={(window.innerWidth * 0.5) + "px"}
             background="white"
             style={{
                 position: "absolute",
                 top: "-50%",
                 left: "25%",
                 clipPath: "circle(50% at 50% 50%)",
                 zIndex: 5,
             }}
        >

        </Box>
    );
};

export default GameEnemyCirclePartial;
