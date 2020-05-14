import React, {FC} from 'react';
import {Box, Heading, Image, Text} from "grommet";

import {colors} from "../../../../styles/theme";

import {hexToRgbA} from "../../../../services/ColorService";

import PlayerStatsContent from "../PlayerStatsContent";

import placeholder from "../../../../assets/images/placeholder.png";

const SideBar: FC = () =>
    <Box width="250px"
         height="90%"
         align="center"
         alignSelf="center"
         style={{
             position: "relative"
         }}
    >
        <Box width="200px"
             height="60%"
        >
            <Image src={placeholder}
                   fit="contain"/>
        </Box>

        <Box height="50%"
             width="100%"
             background="dark"
             pad="1rem"
             justify="center"
             style={{
                 position: "absolute",
                 bottom: 0,
                 clipPath: "polygon(90% 2%, 100% 0, 100% 100%, 70% 97%, 0 100%, 1% 35%, 0 0)",
                 zIndex: 2,
                 boxShadow: hexToRgbA(colors.white, "0.05") + " 0px 0px 20px 20px inset"
             }}>
            <Heading textAlign="center"
                     margin="0 0 1rem"
                     size="2rem">
                Victoria
            </Heading>

            <Box direction="row"
                 align="center"
                 justify="end"
                 pad="0 0.5rem"
            >
                <PlayerStatsContent level={10} experience={45}/>
            </Box>

            {/* Skill Points */}
            <Box width="100%"
                 pad="1rem"
                 style={{
                     borderRadius: "0.25rem",
                     textAlign: "center"
                 }}>
                <Text size="3.5rem" weight="bold">2</Text>
                <Text size="1rem">Verfügbare Fähigkeitspunkte</Text>
            </Box>
        </Box>
    </Box>

export default SideBar;
