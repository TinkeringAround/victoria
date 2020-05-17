import React, {FC, useContext, useEffect, useState} from 'react';
import {Box} from "grommet";

import {TItemDto} from "../../../../types/TItem";

import playerContext from "../../../../contexts/PlayerContext";

import ITEMS from "../../../../game/Items";

import ItemComponent from "../../../../components/ItemComponent";
import HeadingPartial from "./AlchemyTabPartials/HeadingPartial";

interface Props {
    clipPath: string
}

const AlchemyTabPartial: FC<Props> = ({clipPath}) => {
    const {player} = useContext(playerContext);
    const [items, setItems] = useState<Array<TItemDto>>([]);

    useEffect(() => {
        if (player) {
            console.log(player.items);
            const element = ITEMS[player.items[0].name];
            console.log("ELement", element)
            setItems(player.items);
        }
    }, [player])

    return (
        <Box width="100%"
             height="100%"
             direction="row"
             align="end"
             justify="center"
             background="white"
             style={{
                 position: "relative",
                 borderRadius: "1rem",
                 clipPath: clipPath
             }}
        >
            {/* Heading */}
            <HeadingPartial/>

            {/* Player Items */}
            <Box width="90%"
                 height="70%"
                 pad="1rem"
            >
                {items.map((item: TItemDto) => {
                    return <ItemComponent key={"Item-" + item.name}
                                          image={ITEMS[item.name].image}
                                          amount={item.amount}/>
                })}
            </Box>
        </Box>
    );
};

export default AlchemyTabPartial;
