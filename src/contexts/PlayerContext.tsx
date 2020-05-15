import React from "react";

import TPlayer from "../types/TPlayer";

interface Props {
    player: TPlayer | null
    update: (player: TPlayer) => void

    logout: () => void
}

const playerContext = React.createContext<Props>({
    player: null,
    update: (player: TPlayer) => {
    },

    logout: () => {
    }
});

export default playerContext;
