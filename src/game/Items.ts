import {TItem} from "../types/TItem";

import potion from "../assets/images/items/potion.png";
import pertersilie from "../assets/images/items/petersilie.png";
import zweig from "../assets/images/items/zweig.png";
import morgenstunde from "../assets/images/items/morgenstund.png";
import wolfszahn from "../assets/images/items/wolfszahn.png";
import fleisch from "../assets/images/items/fleisch.png";
import elixir from "../assets/images/items/elixir.png";
import stein from "../assets/images/items/stein.png";

type TItemCollection = {
    [name: string]: TItem
}

const ITEMS: TItemCollection = {
    "Petersilie": {
        name: "Petersilie",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "material",
        image: pertersilie
    },
    "Morgenstunde": {
        name: "Morgenstunde",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "material",
        image: morgenstunde
    },
    "Zweig": {
        name: "Zweig",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "material",
        image: zweig
    },
    "Wolfszahn": {
        name: "Wolfszahn",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "material",
        image: wolfszahn
    },
    "Trank": {
        name: "Trank",
        description: "Einfacher Trank mit erquicklichem Effekt",
        type: "consumable",
        image: potion
    },
    "Fleisch": {
        name: "Fleisch",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "consumable",
        image: fleisch
    },
    "Elixir": {
        name: "Elixir",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "material",
        image: elixir
    },
    "Stein": {
        name: "Stein",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "material",
        image: stein
    }
}

export default ITEMS;
