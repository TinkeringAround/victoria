import {TItem} from "../types/TItem";

import potion from "../assets/images/items/potion.png";
import pertersilie from "../assets/images/items/petersilie.png";
import zweig from "../assets/images/items/zweig.png";
import morgenstunde from "../assets/images/items/morgenstund.png";
import knochen from "../assets/images/items/knochen.png";
import fleisch from "../assets/images/items/fleisch.png";
import elixir from "../assets/images/items/elixir.png";
import stein from "../assets/images/items/stein.png";

type TItemCollection = {
    [name: string]: TItem
}

const ITEMS: TItemCollection = {
    "Petersilie": {
        name: "Petersilie",
        description: "Pflanze mit heilender Wirkung",
        type: "material",
        image: pertersilie,
        effect: null
    },
    "Morgenstunde": {
        name: "Morgenstunde",
        description: "Seltene Pflanze, die nur an bestimmten Orten wächst",
        type: "material",
        image: morgenstunde,
        effect: null
    },
    "Zweig": {
        name: "Zweig",
        description: "Ein einfacher Zweig",
        type: "material",
        image: zweig,
        effect: null
    },
    "Knochen": {
        name: "Knochen",
        description: "Stabiler Knochen",
        type: "material",
        image: knochen,
        effect: null
    },
    "Trank": {
        name: "Trank",
        description: "Einfacher Trank mit erquicklichem Effekt",
        type: "consumable",
        image: potion,
        effect: {
            target: "player",
            value: 2,
            description: "Victoria heilt ihre Wunden (2 Lebenspunkte)"
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
            description: "Victoria lockt das nächste Monster an"
        }
    },
    "Elixir": {
        name: "Elixir",
        description: "Seltenes Material zum Herstellen mächtiger Tränke",
        type: "material",
        image: elixir,
        effect: null
    },
    "Stein": {
        name: "Stein",
        description: "Ein einfacher Stein",
        type: "material",
        image: stein,
        effect: null
    }
}

export default ITEMS;
