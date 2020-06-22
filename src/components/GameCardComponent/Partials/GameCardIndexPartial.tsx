import React, {FC} from 'react';
import {Box} from "grommet";

interface Props {
    index: number
}

const GameCardIndexPartial: FC<Props> = ({index}) =>
    <Box width="40px"
         height="40px"
         align="center"
         justify="center"
         background="light"
         color="dark"
         style={{
             position: "absolute",
             top: "-20px",
             left: "-20px",
             borderRadius: "1rem",
             fontSize: "1.5rem",
             fontWeight: "bold",
             zIndex: 5
         }}>
        {index + 1}
    </Box>

export default GameCardIndexPartial;
