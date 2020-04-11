import React, {FC} from 'react';
import {Box} from "grommet";

import MenuPartial from "./Partials/MenuPartial";
import LevelMasterPartial from "./Partials/LevelMasterPartial";
import PlayerStatsPartial from "./Partials/PlayerStatsPartial";
import CurrentLevelPartial from "./Partials/CurrentLevelPartial";

const DashBoard: FC = () => (
    <Box width="100%"
         height="100%"
         background="dark"
         direction="row"
         animation={{type: "fadeIn", delay: 2000}}
         style={{position: "relative"}}
    >
        {/* Menu */}
        <MenuPartial/>

        {/* Current Level */}
        <CurrentLevelPartial level="Kapitel 1 - Aufbruch nach Kinarg"/>

        {/* Player Stats */}
        <PlayerStatsPartial playerLevel={10} playerExperience={45}/>

        {/* Canvas */}
        <LevelMasterPartial/>
    </Box>
);

export default DashBoard;
