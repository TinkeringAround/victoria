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
        image: pertersilie,
        effect: null
    },
    "Morgenstunde": {
        name: "Morgenstunde",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "material",
        image: morgenstunde,
        effect: null
    },
    "Zweig": {
        name: "Zweig",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "material",
        image: zweig,
        effect: null
    },
    "Wolfszahn": {
        name: "Wolfszahn",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "material",
        image: wolfszahn,
        effect: null
    },
    "Trank": {
        name: "Trank",
        description: "Einfacher Trank mit erquicklichem Effekt. Stellt zwei Lebenspunkte her.",
        type: "consumable",
        image: potion,
        effect: {
            target: "player",
            value: 2,
            description: "Stelle zwei Lebenspunkte bei Victoria her."
        }
    },
    "Fleisch": {
        name: "Fleisch",
        description: "Ein Brocken Fleisch zum Anlocken von Monstern",
        type: "consumable",
        image: fleisch,
        effect: {
            target: "circle",
            value: 1,
            description: "Locke das nächste Monster an."
        }
    },
    "Elixir": {
        name: "Elixir",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "material",
        image: elixir,
        effect: null
    },
    "Stein": {
        name: "Stein",
        description: "Lorem ipsum dolor sit amet, consetetur",
        type: "material",
        image: stein,
        effect: null
    }
}

export default ITEMS;
