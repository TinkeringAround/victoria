import React from "react";
import TEffects from "../types/TEffects";
import TSounds from "../types/TSounds";

interface Props {
    muted: boolean
    mute: (mute: boolean) => void

    play: (soundName: TSounds) => void
    pause: () => void

    playEffect: (effectName: TEffects) => void
}

const SoundContext = React.createContext<Props>({
    muted: true,
    mute: mute => {
    },

    play: (soundName) => {
    },
    pause: () => {
    },

    playEffect: effectName => {
    }
});

export default SoundContext;
