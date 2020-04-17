import React, {FC, useContext} from 'react';

import GameMasterContext from "../../../contexts/GameMasterContext";

const CanvasPartial: FC = () => {
    const {id} = useContext(GameMasterContext);

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
