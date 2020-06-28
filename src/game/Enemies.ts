import TEnemy from "../types/TEnemy";

import ratte from "../assets/images/enemies/ratte.png";
import schlange from "../assets/images/enemies/schlange.png";
import wolf from "../assets/images/enemies/wolf.png";

type TEnemyCollection = {
    [name: string]: TEnemy
}

const ENEMIES: TEnemyCollection = {
    "Ratte": {
        name: "Ratte",
        stats: {
            health: 1,
            attack: 1,
            armor: 0,
            experience: 1
        },
        rewards: ["Fleisch"],
        image: ratte
    },
    "Schlange": {
        name: "Schlange",
        stats: {
            health: 3,
            attack: 2,
            armor: 0,
            experience: 2
        },
        rewards: ["Fleisch"],
        image: schlange
    },
    "Wolf": {
        name: "Wolf",
        stats: {
            health: 4,
            attack: 3,
            armor: 0,
            experience: 5
        },
        rewards: ["Wolfszahn", "Fleisch", "Fleisch"],
        image: wolf
    }
}

export default ENEMIES;
