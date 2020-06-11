import React, {FC, useContext} from 'react';
import {Box} from "grommet";

import {colors} from "../../styles/theme";

import SoundContext from "../../contexts/SoundContext";

import {changeColorBrightness} from "../../services/ColorService";

import ButtonComponent from "../../components/ButtonComponent";
import IconComponent from "../../components/IconComponent";

const SoundPage: FC = () => {
    const {muted, mute} = useContext(SoundContext);

    return (
        <React.Fragment>
            <audio id="background-audio" loop muted src=""/>
            <audio id="effect-audio" muted src=""/>

            <Box style={{
                position: "fixed",
                top: "1rem",
                left: "1rem",
                zIndex: 1000
            }}>
                <ButtonComponent color="white"
                                 background="gold"
                                 hoverColor={changeColorBrightness(colors.gold, -20)}
                                 onClick={() => mute(!muted)}
                                 fontSize="1.25rem"
                                 padding="0.75rem"
                >
                    <IconComponent type={muted ? "volume-mute" : "volume-up"}/>
                </ButtonComponent>
            </Box>
        </React.Fragment>
    );
};

export default SoundPage;
