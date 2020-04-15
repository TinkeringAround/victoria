import React, {FC, useContext} from 'react';

import LevelMasterContext from "../../../contexts/ChapterMasterContext";

const CanvasPartial: FC = () => {
    const {id} = useContext(LevelMasterContext);

    return (
        <canvas
            id={id}
            style={{
                width: "100%",
                height: "100%"
            }}/>
    );
};

export default CanvasPartial;
