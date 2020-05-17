import React, {FC} from 'react';
import {Box, Heading} from "grommet";

import {colors} from "../../../../../styles/theme";

const HeadingPartial: FC = () =>
    <Box height="100px"
         pad="1rem 1.5rem"
         background="beige"
         direction="row"
         align="center"
         style={{
             position: "absolute",
             top: "4rem",
             left: "3rem",
             borderRadius: ".1rem",
             color: colors.dark,
             textAlign: "center"
         }}
    >
        <Heading size="2rem"
                 margin="0"
        >
            Victoria's Gegenstände
        </Heading>
    </Box>

export default HeadingPartial;
