import React, {FC} from 'react';
import {Box, Text} from "grommet";

const MAX = 30;

interface Props {
    count: number
}

const CounterPartial: FC<Props> = ({count}) => (
    <Box style={{
        position: "absolute",
        bottom: "0.5rem",
        right: "5.5%"
    }}>
        <Text size="1.5rem" weight="bold" color="dark">
            {`${count} von max. ${MAX}`}
        </Text>
    </Box>
)

export default CounterPartial;
