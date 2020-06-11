import React, {FC, useContext} from 'react';
import {Box} from "grommet";

import PlayerContext from "../../../../contexts/PlayerContext";

import PlayerStatsContent from "./PlayerStatsContent";

interface Props {
    visible: boolean
}

const PlayerStatsPartial: FC<Props> = ({visible}) => {
    const {player} = useContext(PlayerContext);

    const level = player ? player.level : 0;
    const experience = player ? player.experience : 0;
    const gold = player ? player.gold : 0;

    return (
        <Box animation={visible ? "fadeIn" : "fadeOut"}
             direction="row"
             align="center"
             justify="end"
             style={{
                 position: "absolute",
                 top: "1.5rem",
                 right: "2rem",
                 cursor: "default"
             }}
        >
            <PlayerStatsContent level={level} experience={experience} gold={gold}/>
        </Box>
    );
}

export default PlayerStatsPartial;
