import React, {FC} from 'react';
import {Box} from "grommet";

interface Props {
    mesh: string
}

const DetailsPartial: FC<Props> = ({mesh}) => {

    return (
        <Box width="300px"
             height="80%"
             background="light"
             style={{
                 position: "absolute",
                 top: "10%",
                 right: mesh !== "" ? "5%" : "-5%",
                 opacity: mesh !== "" ? 1 : 0,
                 transition: "all 0.5s ease",
                 zIndex: 6
             }}
        >

        </Box>
    );
};

export default DetailsPartial;
