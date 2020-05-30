import React, {FC} from 'react';
import {Box, Text} from "grommet";

interface Props {
    amount: number
}

const ItemAmountPartial: FC<Props> = ({amount}) =>
    <Box style={{
        position: "absolute",
        bottom: 0,
        left: 10,
        zIndex: 3
    }}>
        <Text size="1rem" color="white">
            <small>x </small>{amount}
        </Text>
    </Box>

export default ItemAmountPartial;
