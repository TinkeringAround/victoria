import React from "react";

import ChapterMaster from "../game/ChapterMaster";

interface Props {
    id: string
    levelMaster: ChapterMaster | null
}

const chapterMasterContext = React.createContext<Props>({
    id: "",
    levelMaster: null
});

export default chapterMasterContext;
