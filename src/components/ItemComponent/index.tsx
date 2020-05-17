import React, {FC} from 'react';
import {Box, Image} from "grommet";

const SIZE = "80px";

interface Props {
    image: string
    amount: number

    size?: string
}

const ItemComponent: FC<Props> = ({image, size = SIZE}) => {
    return (
        <Box width={size}
             height={size}
             align="center"
             justify="center"
        >
            <Image width={size}
                   height={size}
                   src={image}
                   fit="contain"/>
        </Box>
    );
};

export default ItemComponent;
