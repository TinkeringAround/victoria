import React from "react";

import TMenuTabs from "../types/TMenuTabs";
import TViewMode from "../types/TViewMode";
import {TCombinationAnimation} from "../types/TCombination";

import LevelMaster from "../game/LevelMaster";

interface Props {
    id: string
    levelMaster: LevelMaster | null,
    viewMode: TViewMode,
    level: number,
    region: string,

    menuTab: null | TMenuTabs
    setMenuTab: (tab: null | TMenuTabs) => void

    executeCombination: (combination: string | null, materials: Array<string>, animation: TCombinationAnimation) => void
}

const GameMasterContext = React.createContext<Props>({
    id: "",
    levelMaster: null,

    viewMode: "detail",
    level: -1,
    region: "",

    menuTab: null,
    setMenuTab: (tab) => {
    },

    executeCombination: (combination, materials, animation) => {
    }
});

export default GameMasterContext;
