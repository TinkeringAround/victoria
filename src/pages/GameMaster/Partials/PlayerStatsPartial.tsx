import React, {FC} from 'react';
import {Box, Text} from "grommet";

import {colors} from "../../../styles/theme";

import {hexToRgbA} from "../../../services/ColorService";

interface Props {
    playerLevel: number
    playerExperience: number
}

const PlayerStatsPartial: FC<Props> = ({playerLevel, playerExperience}) => {

    return (
        <Box
            direction="row"
            align="center"
            justify="end"
            style={{
                position: "absolute",
                top: 20,
                right: 20,
                cursor: "default"
            }}
        >
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
                {playerLevel}
            </Text>

            {/* Player Level */}
            <Box width="15rem"
                 height="0.75rem"
                 background={hexToRgbA(colors.gold, "0.2")}
            >
                <Box height="0.75rem"
                     width={playerExperience + "%"}
                     background="white"
                     style={{
                         clipPath: "polygon(0 0, 95% 0, 100% 100%, 0% 100%)",
                         boxShadow: "0 0 2em 2em white"
                     }}
                >

                </Box>
            </Box>
        </Box>
    )
        ;
};

export default PlayerStatsPartial;
