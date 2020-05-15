import React, {FC, useContext} from 'react';
import {Box, Heading, Text} from "grommet";

import {colors} from "../../../../../styles/theme";

import playerContext from "../../../../../contexts/PlayerContext";

const PlayerStatsPartial: FC = () => {
    const {player} = useContext(playerContext);

    return (
        <Box pad="1rem 1.5rem"
             background="beige"
             direction="row"
             align="center"
             style={{
                 position: "absolute",
                 top: "2rem",
                 left: "2rem",
                 borderRadius: "1rem",
                 color: colors.dark,
                 textAlign: "center"
             }}
        >
            {/* Stufe */}
            <Box width="70px"
                 height="70px"
                 background="white"
                 align="center"
                 justify="center"
                 margin={{right: "1.5rem"}}
                 style={{
                     borderRadius: "50%"
                 }}
            >
                <Text size="0.75rem">
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
            <Heading size="2rem"
                     margin="0"
            >
                Victoria
            </Heading>
        </Box>
    );
};

export default PlayerStatsPartial;
