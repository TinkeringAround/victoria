import React from "react";

interface Props {
    muted: boolean
    mute: (mute: boolean) => void

    play: (soundName: string) => void
    pause: () => void
}

const SoundContext = React.createContext<Props>({
    muted: true,
    mute: mute => {
    },

    play: (soundName) => {
    },
    pause: () => {
    }
});

export default SoundContext;
