import React, {FC, useEffect, useState} from 'react';

import LevelMaster from "../../../game/LevelMaster";

const LEVEL_MASTER_ID = "levelMaster";

const LevelMasterPartial: FC = () => {
    const [levelMaster, setLevelMaster] = useState<LevelMaster | null>(null);

    useEffect(() => {
        if (!levelMaster) {
            let newLevelMaster = new LevelMaster(LEVEL_MASTER_ID);
            newLevelMaster.createScene();
            newLevelMaster.doRender();
            setLevelMaster(newLevelMaster);
        }
    }, []);

    return (
        <canvas
            id={LEVEL_MASTER_ID}
            style={{
                width: "100%",
                height: "100%"
            }}/>
    );
};

export default LevelMasterPartial;
