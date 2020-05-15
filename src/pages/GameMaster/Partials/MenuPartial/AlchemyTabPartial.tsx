import React, {FC, useContext, useEffect} from 'react';
import {Box} from "grommet";

import playerContext from "../../../../contexts/PlayerContext";

import ITEMS from "../../../../game/Items";

interface Props {

}

const AlchemyTabPartial: FC<Props> = ({}) => {
    const {player} = useContext(playerContext);

    useEffect(() => {
        if (player) {
            console.log(player.items);
            const element = ITEMS[player.items[0].name];
            console.log("ELement", element)
        }
    }, [player])

    return (
        <Box width="100%"
             height="100%"
             direction="row"
             align="center"
             justify="between"
             background="white"
             style={{
                 position: "relative",
                 borderRadius: "1rem"
             }}
        >

            <Box width="70%"
                 height="90%"
                 background="beige"
                 style={{
                     borderRadius: "1rem"
                 }}>
                Collection
            </Box>

            <Box width="25%"
                 height="90%"
                 style={{
                     borderRadius: "1rem"
                 }}>
                Kombination
            </Box>
        </Box>
    );
};

export default AlchemyTabPartial;
