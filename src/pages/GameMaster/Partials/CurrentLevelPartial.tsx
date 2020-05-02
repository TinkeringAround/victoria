import React, {FC, useContext} from 'react';
import {Box, Heading} from "grommet";

import GameMasterContext from "../../../contexts/GameMasterContext";

import LEVELS from "../../../game/Levels";

const CurrentLevelPartial: FC = () => {
    const {level, viewMode} = useContext(GameMasterContext);

    return (
        <Box
            width="100%"
            justify="center"
            align="center"
            style={{
                position: "absolute",
                top: 75,
            }}>
            <Heading margin="0">{viewMode === "world" ? "Weltkarte" : LEVELS[level].name}</Heading>
        </Box>
    )
}

export default CurrentLevelPartial;
