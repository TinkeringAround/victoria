import {TItem} from "../types/TItem";

import potion from "../assets/images/items/potion.png";

type TItemCollection = {
    [name: string]: TItem
}

const ITEMS: TItemCollection = {
    "Gold": {
        name: "Gold",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "gold",
        image: "",
    },
    "Petersilie": {
        name: "Petersilie",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "crafting",
        image: "",
    },
    "Zweig": {
        name: "Zweig",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "crafting",
        image: ""
    },
    "Wolfsleber": {
        name: "Wolfsleber",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "crafting",
        image: ""
    },
    "Trank": {
        name: "Trank",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "crafting",
        image: potion
    }
}

export default ITEMS;
