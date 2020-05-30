import {TWeapon} from "../types/TWeapon";

import holzbogen from "../assets/images/items/holzbogen.png";
import holzstab from "../assets/images/items/holzstab.png";
import holzschild from "../assets/images/items/holzschild.png";

type TWeaponCollection = {
    [name: string]: TWeapon
}

const WEAPONS: TWeaponCollection = {
    "Holzbogen": {
        name: "Holzbogen",
        description: "Lorem ipsum dolor sit amet, consetetur",
        image: holzbogen,
        type: "weapon",
        value: 2
    },
    "Holzstab": {
        name: "Holzstab",
        description: "Lorem ipsum dolor sit amet, consetetur",
        image: holzstab,
        type: "weapon",
        value: 1
    },
    "Holzschild": {
        name: "Holzschild",
        description: "Lorem ipsum dolor sit amet, consetetur",
        image: holzschild,
        type: "shield",
        value: 1
    }
}

export default WEAPONS;
