import React, {FC} from 'react';
import {Box, Text} from "grommet";

interface Props {
    round: number

    isVisible: boolean
    delay: number
}

const GameRoundPartial: FC<Props> = ({round, isVisible, delay}) => (
    <Box animation={isVisible ? {delay: delay, type: "slideDown", size: "xlarge"} : "fadeOut"}
         align="center"
         direction="row"
         style={{
             position: "absolute",
             top: "1.5rem",
             right: "2rem",
             cursor: "default"
         }}>
        <Text size="2rem" margin="0 1rem 0 0">
            Runde
        </Text>
        <Text size="3rem"
              weight="bold"
              margin="0"
        >
            {round}
        </Text>
    </Box>
);
export default GameRoundPartial;
