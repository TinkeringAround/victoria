import React, {FC, useEffect, useState} from 'react';
import {Box, Heading, Keyboard, Text} from "grommet";

import {TLoginMode} from "../../../types/TLoginMode";
import {TResponse, TResponseCode} from "../../../types/TResponse";

import {EMessages} from "../../../assets/messages";

import {loginUserWithEmailAndPassword, registerUserWithEmailAndPassword} from "../../../services/firebaseService";

import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";

interface Props {
    mode: TLoginMode
}

const FormularPartial: FC<Props> = ({mode}) => {
    const [state, setState] = useState<"idle" | "loading">("idle");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [response, setResponse] = useState<TResponse | null>(null);

    const handleSubmit = async () => {
        if (email !== "" && password !== "") {
            setState("loading");
            setResponse(mode === "login" ?
                await loginUserWithEmailAndPassword(email, password) :
                await registerUserWithEmailAndPassword(email, password));
            setState("idle");
        }
    };

    useEffect(() => {
        if (response) setResponse(null);
    }, [email, password]);

    return (
        <Keyboard onEnter={handleSubmit}>
            <Box
                width="80%"
                height="80%"
                pad="3rem"
                align="center"
                justify="center">

                {/* Heading */}
                <Heading size="5rem"
                         margin="0 0 1rem"
                         color="white"
                >
                    {mode === "login" ? "Anmelden" : "Neu hier?"}
                </Heading>

                {/* Email */}
                <InputComponent type="email" label="Email"
                                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                                value={email}
                                setValue={(value: string) => setEmail(value)}/>

                {/* Password */}
                <InputComponent type="password" label="Passwort" value={password}
                                setValue={(value: string) => setPassword(value)}
                                margin="1rem 0 0.25rem 0"/>

                {/* Error Message */}
                <Text size="1.5rem"
                      weight="bold"
                      margin="1.5rem 0 0"
                      color="red"
                      style={{height: "2rem"}}
                >
                    {response?.type === TResponseCode.LOGIN_ERROR && EMessages.LOGIN_ERROR}
                    {response?.type === TResponseCode.REGISTRATION_ERROR && EMessages.REGISTRATION_ERROR}
                </Text>

                {/* Button */}
                <ButtonComponent
                    disabled={state === "loading" || email === "" || password === ""}
                    color="white"
                    background="medium"
                    hoverColor="dark"
                    margin="1.5rem 0 0"
                    onClick={mode === "login" ? handleSubmit : handleSubmit}
                >
                    {state === "idle" && mode === "login" && "Einloggen"}
                    {state === "idle" && mode === "register" && "Registrieren"}
                    {state === "loading" && "Loading..."}
                </ButtonComponent>
            </Box>
        </Keyboard>
    );
};

export default FormularPartial;
