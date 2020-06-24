import TGameState from "../types/TGameState";
import {TItem, TItemDto} from "../types/TItem";
import {TWeapon, TWeaponDto} from "../types/TWeapon";
import TPlayer from "../types/TPlayer";
import TEnemyDto from "../types/TEnemyDto";

import ITEMS from "../game/Items";
import WEAPONS from "../game/Weapons";
import SKILLS from "../game/Skills";
import ENEMIES from "../game/Enemies";

type TGameMutationResult = TGameState | "win" | "loose";

export const mutateGameState: (player: TPlayer, gameState: TGameState, action: TItemDto | TWeaponDto | number) => TGameMutationResult = (player, gameState, action) => {
    const {health, equipments, enemies, enemyIndex} = gameState;

    let newHealth = health,
        newEnemyIndex = enemyIndex,
        newEnemies = Array.from(enemies);
    const newEquipments = Array.from(equipments);

    // Enemy Attack
    if (typeof action === "number") newHealth = mutateHealth(newHealth, -action);
    // Card
    else {
        // Remove current Action
        newEquipments.splice(newEquipments.indexOf(action), 1);

        // Item Effect
        if (isItem(action)) {
            const item: TItem = ITEMS[action.name];

            if (item.effect) {
                switch (item.effect.target) {
                    case "player":
                        newHealth = mutateHealth(newHealth, item.effect.value, getSkillBonus(player, SKILLS["Alchemie"].multiplier));
                        break;
                    case "circle":
                        newEnemyIndex = mutateEnemyIndex(newEnemyIndex, item.effect.value, newEnemies.length);
                        break;
                    default:
                        newEnemies = mutateEnemies(newEnemies, newEnemyIndex, item.effect.value, getSkillBonus(player, SKILLS["Alchemie"].multiplier));
                }
            }
        } else {
            // Weapon Attack / Shield Defence
            const weapon: TWeapon = WEAPONS[action.name];

            if (weapon.type === "weapon") newEnemies = mutateEnemies(newEnemies, newEnemyIndex, weapon.value, getSkillBonus(player, SKILLS["Angriff"].multiplier));
            else newHealth = mutateHealth(newHealth, weapon.value, getSkillBonus(player, SKILLS["Verteidigung"].multiplier));
        }
    }

    // Check Win Condition
    if (newHealth <= 0) return "loose";
    if (newEnemies.every((enemy) => enemy.health <= 0)) return "win";

    // Return new State
    return {
        health: newHealth,
        equipments: newEquipments,
        enemyIndex: newEnemyIndex,
        enemies: newEnemies
    };
}

const isItem: (itemOrWeapon: TItemDto | TWeaponDto) => boolean = (itemOrWeapon) => {
    return ITEMS.hasOwnProperty(itemOrWeapon.name);
}

const getSkillBonus: (player: TPlayer, multiplier: number) => number = (player, multiplier) => {
    return Math.floor((player.level - 1) * multiplier);
}

const mutateHealth: (health: number, value: number, skillBonus?: number) => number = (health, value, skillBonus = 0) => {
    return health + value + skillBonus;
}

const mutateEnemyIndex: (enemyIndex: number, value: number, max: number) => number = (enemyIndex, value, max) => {
    const sum = enemyIndex + value;

    if (sum >= max) return sum % max;
    else if (sum < 0) return max + sum;

    return sum;
}

const mutateEnemies: (enemies: Array<TEnemyDto>, enemyIndex: number, value: number, skillBonus: number) => Array<TEnemyDto> = (enemies, enemyIndex, value, skillBonus) => {
    enemies[enemyIndex].health = enemies[enemyIndex].health - value - skillBonus + ENEMIES[enemies[enemyIndex].name].stats.armor;
    return Array.from(enemies);
}

export const gameIs: (gameState: TGameMutationResult, win: boolean) => boolean = (gameState, win) => {
    if (typeof gameState === "string") {
        return win ? gameState === "win" : gameState === "loose";
    }

    return false;
}

