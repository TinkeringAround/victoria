import TEnemyDto from "../types/TEnemyDto";
import {TRegion} from "../types/TRegion";

import ENEMIES from "../game/Enemies";

export const generateEnemies: (region: TRegion) => Array<TEnemyDto> = (region) => {
    const enemies: Array<TEnemyDto> = [];
    const enemiesCount = getEnemyCountByDifficulty(region.difficulty);

    for (let i = 1; i <= enemiesCount; i += 1) {
        const enemy = ENEMIES[pickRandomElement(region.enemies)];
        enemies.push({name: enemy.name, health: enemy.stats.health});
    }

    return enemies;
}

export const pickRandomElement: (array: Array<any>) => any = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const getEnemyCountByDifficulty: (difficulty: number) => number = (difficulty) => {
    switch (difficulty) {
        case 1:
            return 4;
        case 2:
            return 8;
        case 3:
            return 12;
        default:
            return 16
    }
} 
