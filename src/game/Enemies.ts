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
            health: 4,
            attack: 1,
            armor: 0,
            experience: 1
        },
        image: ratte
    },
    "Schlange": {
        name: "Schlange",
        stats: {
            health: 6,
            attack: 2,
            armor: 1,
            experience: 4
        },
        image: schlange
    },
    "Wolf": {
        name: "Wolf",
        stats: {
            health: 8,
            attack: 3,
            armor: 2,
            experience: 8
        },
        image: wolf
    }
}

export default ENEMIES;
