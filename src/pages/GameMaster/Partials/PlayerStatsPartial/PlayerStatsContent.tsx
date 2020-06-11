import React, {FC, Fragment} from 'react';
import {Box, Meter, Text} from "grommet";

import IconComponent from "../../../../components/IconComponent";

const Separator = () => <Text size="1.5rem" color="dark" margin="0 1.5rem"/>

interface Props {
    level: number
    experience: number
    gold: number
}

const PlayerStatsContent: FC<Props> = ({level, experience, gold}) =>
    <Fragment>
        {/* Player Gold */}
        <Box align="center"
             justify="center"
             margin="0 0.5rem 0 0"
             style={{fontSize: "0.8rem"}}
        >
            <IconComponent type="money"/>
        </Box>
        <Text size="2rem"
              weight="bold"
              margin="0"
        >
            {gold}
        </Text>

        {/* Separator */}
        <Separator/>

        {/* Player Level */}
        <Text size="1rem" margin="0 .5rem 0 0">
            Stufe
        </Text>
        <Text size="2rem"
              weight="bold"
              margin="0"
        >
            {level}
        </Text>

        {/* Separator */}
        <Separator/>

        {/* Player Experience*/}
        <Text size="1rem" margin="0 .5rem 0 0">
            Erfahrung
        </Text>
        <Box width="1.75rem"
             height="1.75rem"
             align="center"
             justify="center"
             margin="0"
        >
            <Meter thickness="large"
                   background="medium"
                   type="circle"
                   max={100}
                   values={[{"value": experience, color: "white"}]}
            />
        </Box>
    </Fragment>

export default PlayerStatsContent;
