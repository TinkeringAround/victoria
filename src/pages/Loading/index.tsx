import React, {FC} from 'react';
import {Box} from "grommet";
import styled from "styled-components";
import Typical from 'react-typical'

import LogoComponent from "../../components/LogoComponent";

const SLoadingText = styled(Typical)`
    font-size: 3rem;
`;

const DURATION = 500;

const LoadingPage: FC = () => (
    <Box
        height={window.innerHeight + "px"}
        width={window.innerWidth + "px"}
        background="dark"
        style={{position: "absolute", zIndex: 500}}
    >
        <Box align="center" direction="row" style={{position: "absolute", right: "5rem", bottom: "3rem"}}>
            {/* Text */}
            <SLoadingText
                steps={[`Loading`, DURATION, `Loading.`, DURATION, `Loading..`, DURATION, `Loading...`, 2 * DURATION]}
                loop={Infinity}
            />

            {/* Logo */}
            <Box height="5rem" width="5rem" margin={{left: "2rem"}}>
                <LogoComponent/>
            </Box>
        </Box>
    </Box>
);

export default LoadingPage;
