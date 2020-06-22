import React from "react";
import TEffects from "../types/TEffects";

interface Props {
    muted: boolean
    mute: (mute: boolean) => void

    play: (soundName: string) => void
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
