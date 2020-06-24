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
    return 4 * difficulty;
}

export const getCircleRotation: (index: number, maxEnemies: number) => number = (index, maxEnemies) => {
    return (360 / maxEnemies) * index;
}

export const getEnemyRotation: (index: number, maxEnemies: number) => number = (index, maxEnemies) => {
    return index * (-360 / maxEnemies);
}

export const getEnemyPosition: (index: number, length: number, size: number, maxSize: number) => { top: number, left: number } = (index, length, size, maxSize) => {
    const tolerance = 15;

    if (length === 4) {
        if (index === 0) return generatePosition(maxSize - size - tolerance, maxSize / 2 - size / 2);
        if (index === 1) return generatePosition(maxSize / 2 - size / 2, maxSize - size - tolerance);
        if (index === 2) return generatePosition(tolerance, maxSize / 2 - size / 2);
        if (index === 3) return generatePosition(maxSize / 2 - size / 2, tolerance)
    }

    return {top: 0, left: 0}
}

const generatePosition: (top: number, left: number) => { top: number, left: number } = (top, left) => {
    return {top: Math.floor(top), left: Math.floor(left)};
}
