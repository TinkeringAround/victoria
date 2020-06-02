import React, {FC} from 'react';
import {Box, Heading} from "grommet";

interface Props {
    width: string

    offsetTop: string
}

const HeadingPartial: FC<Props> = ({width, offsetTop}) => (
    <Box width="90%"
         height="30px"
         direction="row"
         justify="between"
         style={{
             position: "absolute",
             top: `calc(calc(calc(100% - ${offsetTop}) / 2) - 1rem)`,
             left: "5%"
         }}>
        <Heading size="1.75rem"
                 color="dark"
                 margin="0"
                 textAlign="center"
                 style={{
                     width: width,
                 }}>
            Inventar
        </Heading>
        <Heading size="1.75rem"
                 color="dark"
                 margin="0"
                 textAlign="center"
                 style={{
                     width: `calc(100% - ${width} - 2rem)`
                 }}>
            Ausrüstung
        </Heading>
    </Box>
)

export default HeadingPartial;
