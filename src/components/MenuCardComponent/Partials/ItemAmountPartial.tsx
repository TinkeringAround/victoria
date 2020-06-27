import React, {FC} from 'react';
import {Box, Text} from "grommet";

interface Props {
    amount: number
    noX?: boolean
}

const ItemAmountPartial: FC<Props> = ({amount, noX = false}) =>
    <Box style={{
        position: "absolute",
        bottom: 0,
        left: 10,
        zIndex: 3
    }}>
        <Text size="1rem" color="white">
            {!noX && <React.Fragment><small>x </small>{amount}</React.Fragment>}
            {noX && <React.Fragment>{amount}</React.Fragment>}
        </Text>
    </Box>

export default ItemAmountPartial;
