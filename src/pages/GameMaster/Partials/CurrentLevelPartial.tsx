import React, {FC} from 'react';
import {Box, Heading} from "grommet";

interface Props {
    level: string
}

const CurrentLevelPartial: FC<Props> = ({level}) => <Box
    width="100%"
    justify="center"
    align="center"
    style={{
        position: "absolute",
        top: 75,
    }}>
    <Heading margin="0">{level}</Heading>
</Box>

export default CurrentLevelPartial;
