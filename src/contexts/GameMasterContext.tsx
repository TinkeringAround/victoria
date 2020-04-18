import React from "react";

import {TMenuTabs} from "../types/TMenuTabs";

import ChapterMaster from "../game/ChapterMaster";

interface Props {
    id: string
    chapterMaster: ChapterMaster | null,

    menuIsOpen: false | TMenuTabs
    setMenuIsOpen: (tab: false | TMenuTabs) => void
}

const gameMasterContext = React.createContext<Props>({
    id: "",
    chapterMaster: null,

    menuIsOpen: false,
    setMenuIsOpen: (tab: false | TMenuTabs) => {
    }
});

export default gameMasterContext;
