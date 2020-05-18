import React, {FC, useContext} from 'react';
import {Box, Heading, Text} from "grommet";

import {colors} from "../../../../styles/theme";

import playerContext from "../../../../contexts/PlayerContext";

const PlayerStatsPartial: FC = () => {
    const {player} = useContext(playerContext);

    return (
        <Box width="100%"
             direction="column"
             align="center"
             justify="center"
             margin={{bottom: "2rem"}}
             style={{
                 color: colors.dark,
                 textAlign: "center"
             }}
        >
            {/* Stufe */}
            <Box width="80px"
                 height="80px"
                 background="white"
                 align="center"
                 justify="center"
                 direction="column"
                 margin={{bottom: "1rem"}}
                 style={{
                     borderRadius: "50%"
                 }}
            >
                <Text size="1rem">
                    Stufe
                </Text>
                <Text size="2rem"
                      weight="bold"
                      margin="0"
                      style={{
                          lineHeight: "2rem",
                          fontFamily: "Roboto"
                      }}
                >
                    {player ? player.level : 0}
                </Text>
            </Box>


            {/* Name */}
            <Heading size="3rem"
                     margin="0"
            >
                Victoria
            </Heading>
        </Box>
    );
};

export default PlayerStatsPartial;
