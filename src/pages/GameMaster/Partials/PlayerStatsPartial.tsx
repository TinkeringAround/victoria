import React, {FC} from 'react';
import {Box} from "grommet";
import PlayerStatsContent from "./PlayerStatsContent";

interface Props {
    visible: boolean
    level: number
    experience: number
}

const PlayerStatsPartial: FC<Props> = ({visible, level, experience}) => (
    <Box animation={visible ? "fadeIn" : "fadeOut"}
         direction="row"
         align="center"
         justify="end"
         style={{
             position: "absolute",
             top: 20,
             right: 20,
             cursor: "default"
         }}
    >
        <PlayerStatsContent level={level} experience={experience}/>
    </Box>
);

export default PlayerStatsPartial;
