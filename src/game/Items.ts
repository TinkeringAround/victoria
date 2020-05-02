import {TItem} from "../types/TItem";

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
    "Rattenschwanz": {
        name: "Rattenschwanz",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "crafting",
        image: ""
    }
}

export default ITEMS;
