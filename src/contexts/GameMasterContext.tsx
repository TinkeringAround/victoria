import React from "react";

import {TMenuTabs} from "../types/TMenuTabs";

import LevelMaster from "../game/LevelMaster";

interface Props {
    id: string
    levelMaster: LevelMaster | null,

    menuIsOpen: false | TMenuTabs
    setMenuIsOpen: (tab: false | TMenuTabs) => void
}

const gameMasterContext = React.createContext<Props>({
    id: "",
    levelMaster: null,

    menuIsOpen: false,
    setMenuIsOpen: (tab: false | TMenuTabs) => {
    }
});

export default gameMasterContext;
