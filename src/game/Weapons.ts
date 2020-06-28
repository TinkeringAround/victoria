import {TWeapon} from "../types/TWeapon";

import knochenbogen from "../assets/images/items/knochenbogen.png";
import holzstab from "../assets/images/items/holzstab.png";
import holzschild from "../assets/images/items/holzschild.png";

type TWeaponCollection = {
    [name: string]: TWeapon
}

const WEAPONS: TWeaponCollection = {
    "Knochenbogen": {
        name: "Knochenbogen",
        description: "Ein aus Knochen hergestellter Bogen",
        image: knochenbogen,
        type: "weapon",
        value: 2
    },
    "Holzstab": {
        name: "Holzstab",
        description: "Einfacher Stab hergestellt aus einem kräftigen Zweig",
        image: holzstab,
        type: "weapon",
        value: 1
    },
    "Holzschild": {
        name: "Holzschild",
        description: "Stabile unbehandelte Holzplatte",
        image: holzschild,
        type: "shield",
        value: 1
    }
}

export default WEAPONS;
