import React, {FC} from 'react';
import {Box} from "grommet";

import MenuPartial from "./Partials/MenuPartial";
import GameMasterPartial from "./Partials/GameMasterPartial";

const GamePage: FC = () => (
    <Box width="100%"
         height="100%"
         background="dark"
         direction="row"
         animation={{type: "fadeIn", delay: 2000}}
         style={{position: "relative"}}
    >
        {/* Menu */}
        <MenuPartial/>

        {/* Canvas */}
        <GameMasterPartial/>
    </Box>
);

export default GamePage;
