import React, {FC, Fragment} from 'react';
import {Box, Text} from "grommet";

import {colors} from "../../../styles/theme";

import {hexToRgbA} from "../../../services/ColorService";

interface Props {
    level: number
    experience: number
}

const PlayerStatsContent: FC<Props> = ({level, experience}) => <Fragment>
    <Text size="1rem"
          margin="0 .5rem 0 0"
    >
        Stufe
    </Text>
    <Text size="2rem"
          weight="bold"
          margin="0 1rem 0 0"
          style={{
              fontFamily: "Roboto"
          }}
    >
        {level}
    </Text>

    {/* Player Level */}
    <Box width="15rem"
         height="0.75rem"
         background={hexToRgbA(colors.gold, "0.2")}
    >
        <Box height="0.75rem"
             width={experience + "%"}
             background="white"
             style={{
                 clipPath: "polygon(0 0, 95% 0, 100% 100%, 0% 100%)",
                 boxShadow: "0 0 2em 2em white"
             }}
        >

        </Box>
    </Box>
</Fragment>

export default PlayerStatsContent;
