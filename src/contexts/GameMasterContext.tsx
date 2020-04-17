import React from "react";

import ChapterMaster from "../game/ChapterMaster";

interface Props {
    id: string
    chapterMaster: ChapterMaster | null
}

const gameMasterContext = React.createContext<Props>({
    id: "",
    chapterMaster: null
});

export default gameMasterContext;
