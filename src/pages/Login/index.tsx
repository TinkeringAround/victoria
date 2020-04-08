import React, {FC, useState} from 'react';
import {Box, Heading} from "grommet";
import styled from "styled-components";

import {colors} from "../../styles/theme";

import LogoComponent from "../../components/LogoComponent";

import FormularPartial from "./Partials/formular";

import {TLoginMode} from "../../types/TLoginMode";

const SBox = styled(Box)`
    width: 50%;
    height: 100%;
    
    align-items: center;
    justify-content: center;
    
    color: ${colors.gold};
    
    cursor: pointer;
    
    transition: all 0.25s ease;
    
    :hover {
        background: rgba(255, 255, 255, 0.2);
        color: white;
    }
`;

const DELAY = 1500;
const DELAY_SHORT = 250;
const MODES: Array<TLoginMode> = ["login", "register"];

const LoginPage: FC = () => {
    const [mode, setMode] = useState<TLoginMode | null>(null);

    return (
        <React.Fragment>

            {/* Logo */}
            <Box
                width="100%"
                height="100%"
                background="dark"
                align="center"
                justify="center"
            >
                <Box
                    width="30%"
                    height="30%"
                    animation={[{
                        type: "fadeIn",
                        delay: 500
                    }, "slideUp"]}
                >
                    <LogoComponent/>
                </Box>
            </Box>

            {/* Overlay */}
            <Box
                width="100%"
                height="100%"
                background="transparent"
                direction="row"
                animation={{
                    type: "fadeIn",
                    delay: DELAY
                }}
                style={{position: "absolute", zIndex: 1}}
            >
                {MODES.map(loginMode =>
                    <SBox
                        key={"Overlay-" + loginMode}
                        onClick={() => setMode(loginMode)}
                    >
                        <Heading size="4rem">{loginMode === "login" ? "Einloggen" : "Registrieren"}</Heading>
                    </SBox>)}
            </Box>

            {/* Formular */}
            {MODES.map(loginMode =>
                <Box
                    key={"Formular-" + loginMode}
                    width="50%"
                    height="100%"
                    align="center"
                    justify="center"
                    background="gold"
                    animation={mode && mode === loginMode ? {
                        type: "fadeIn",
                        delay: DELAY_SHORT
                    } : "fadeOut"}
                    style={{
                        position: "absolute",
                        zIndex: mode && mode === loginMode ? 2 : -1,
                        right: mode === "register" ? 0 : "unset"
                    }}
                >
                    <FormularPartial mode={loginMode}/>
                </Box>)}


        </React.Fragment>
    );
};

export default LoginPage;
