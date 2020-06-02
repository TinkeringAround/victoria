import React, {FC, useContext, useEffect, useState} from 'react';
import {Box} from "grommet";

import {TCombinationDto} from "../../../../types/TCombination";

import playerContext from "../../../../contexts/PlayerContext";

interface Props {
    combination: TCombinationDto | null
    onFinished: () => void
}

const CombinationPartial: FC<Props> = ({combination, onFinished}) => {
    const {} = useContext(playerContext)
    const [processing, setProcessing] = useState<boolean>(false);

    useEffect(() => {
        if (!processing && combination != null) setProcessing(true);
    }, [combination])

    // TODO: Remove used Items and Update Player Combinations
    // TODO: Pot Animation
    // TODO: Reset combination with OnFinished

    return (
        <Box
            animation={processing ? "fadeIn" : "fadeOut"}
            height={window.innerHeight + "px"}
            width={window.innerWidth + "px"}
            background="dark"
            style={{
                position: "absolute",
                zIndex: processing ? 400 : -1,
            }}
        >
            {/* TODO: Implement */}
        </Box>
    );
};

export default CombinationPartial;
