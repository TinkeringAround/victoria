import TGameState from "../types/TGameState";
import {TItem, TItemDto} from "../types/TItem";
import {TWeapon, TWeaponDto} from "../types/TWeapon";
import TPlayer from "../types/TPlayer";
import TEnemyDto from "../types/TEnemyDto";
import {TRegion} from "../types/TRegion";
import TRewards from "../types/TRewards";
import TEquipmentsUpdate from "../types/TEquipmentsUpdate";
import TGameMutation from "../types/TGameMutation";

import {pickRandomElement} from "./UtilityService";

import ITEMS from "../game/Items";
import WEAPONS from "../game/Weapons";
import SKILLS from "../game/Skills";
import ENEMIES from "../game/Enemies";

type TGameMutationResult = TGameState | "win" | "loose";
type TGameStateMutationsResult = {
    gameStates: Array<TGameState>
    gameLost: boolean
    gameWon: boolean
}

export const getGameStateMutations: (player: TPlayer, gameState: TGameState, turnActions: Array<TItemDto | TWeaponDto | TGameMutation>) => TGameStateMutationsResult = (player, gameState, turnActions) => {
    let gameWon = false, gameLost = false;
    const gameStates: Array<TGameState> = [];

    turnActions.forEach((action, index) => {
        if (!gameWon && !gameLost) {
            const firstItem = index === 0;
            const nextGameState = mutateGameState(player, {
                health: firstItem ? gameState.health : gameStates[index - 1].health,
                equipments: firstItem ? gameState.equipments : gameStates[index - 1].equipments,
                usedItems: firstItem ? gameState.usedItems : gameStates[index - 1].usedItems,
                enemyIndex: firstItem ? gameState.enemyIndex : gameStates[index - 1].enemyIndex,
                enemies: firstItem ? gameState.enemies : gameStates[index - 1].enemies
            }, action);

            if (typeof nextGameState === "string") {
                gameWon = gameIs(nextGameState, true);
                gameLost = gameIs(nextGameState, false);
            } else gameStates.push(nextGameState);
        }
    });

    return {
        gameStates: gameStates,
        gameLost: gameLost,
        gameWon: gameWon
    };
}

export const mutateGameState: (player: TPlayer, gameState: TGameState, action: TItemDto | TWeaponDto | TGameMutation) => TGameMutationResult = (player, gameState, action) => {
    const {health, equipments, usedItems, enemies, enemyIndex} = gameState;

    let newHealth = health,
        newEnemyIndex = enemyIndex,
        newEnemies = Array.from(enemies);
    const newEquipments = Array.from(equipments);
    const newUsedItems = Array.from(usedItems);

    // Enemy Attack or Dice Roll
    if (action.hasOwnProperty("target")) {
        const mutation: TGameMutation = action as TGameMutation;

        switch (mutation.target) {
            case "player":
                newHealth = mutateHealth(newHealth, -mutation.value);
                break;
            case "circle":
                newEnemyIndex = mutateEnemyIndex(newEnemyIndex, mutation.value, newEnemies.length);
                break;
        }
    }
    // Card
    else {
        const card: TItemDto | TWeaponDto = action as (TWeaponDto | TItemDto);

        // Remove current Action
        newEquipments.splice(newEquipments.indexOf(card), 1);

        // Item Effect
        if (isItem(card)) {
            const item: TItem = ITEMS[card.name];

            if (item.effect) {
                switch (item.effect.target) {
                    case "player":
                        newHealth = mutateHealth(newHealth, item.effect.value, getSkillBonus(player.skills.Alchemie, SKILLS["Alchemie"].multiplier));
                        break;
                    case "circle":
                        newEnemyIndex = mutateEnemyIndex(newEnemyIndex, item.effect.value, newEnemies.length);
                        break;
                    default:
                        newEnemies = mutateEnemies(newEnemies, newEnemyIndex, item.effect.value, getSkillBonus(player.skills.Alchemie, SKILLS["Alchemie"].multiplier));
                }
            }

            newUsedItems.push(card);
        } else {
            // Weapon Attack / Shield Defence
            const weapon: TWeapon = WEAPONS[card.name];

            if (weapon.type === "weapon") newEnemies = mutateEnemies(newEnemies, newEnemyIndex, weapon.value, getSkillBonus(player.skills.Angriff, SKILLS["Angriff"].multiplier));
            else newHealth = mutateHealth(newHealth, weapon.value, getSkillBonus(player.skills.Verteidigung, SKILLS["Verteidigung"].multiplier));
        }
    }

    // Check Win Condition
    if (newHealth <= 0) return "loose";
    if (newEquipments.length === 0 && newEnemies.some(enemy => enemy.health > 0)) return "loose";
    if (newEnemies.every((enemy) => enemy.health <= 0)) return "win";

    // Return new State
    return {
        health: newHealth,
        equipments: newEquipments,
        usedItems: newUsedItems,
        enemyIndex: newEnemyIndex,
        enemies: newEnemies
    };
}

const isItem: (itemOrWeapon: TItemDto | TWeaponDto) => boolean = (itemOrWeapon) => {
    return ITEMS.hasOwnProperty(itemOrWeapon.name);
}

export const getSkillBonus: (skillLevel: number, multiplier: number) => number = (skillLevel, multiplier) => {
    return Math.floor((skillLevel - 1) * multiplier);
}

const mutateHealth: (health: number, value: number, skillBonus?: number) => number = (health, value, skillBonus = 0) => {
    return health + value + skillBonus;
}

export const mutateEnemyIndex: (enemyIndex: number, value: number, max: number) => number = (enemyIndex, value, max) => {
    const sum = enemyIndex + value;

    if (sum >= max) return sum % max;
    else if (sum < 0) return max + sum;

    return sum;
}

export const getPossibleDicePositions: (enemies: Array<TEnemyDto>, enemyIndex: number) => Array<number> = (enemies, enemyIndex) => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const possibleDiceValues: Array<number> = [];

    numbers.forEach((number) => {
        const newEnemyIndex = mutateEnemyIndex(enemyIndex, number, enemies.length);
        if (enemies[newEnemyIndex].health > 0) possibleDiceValues.push(number);
    });

    return possibleDiceValues;
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

export const gainedExperience: (player: TPlayer, enemies: Array<TEnemyDto>) => number = (player, enemies) => {
    let experience = 0;

    enemies.forEach(enemy => {
        if (enemy.health <= 0) experience += ENEMIES[enemy.name].stats.experience;
    });

    return experience;
}

export const getRewards: (region: TRegion, enemies: Array<TEnemyDto>) => TRewards = (region, enemies) => {
    const rewards: Array<TItemDto | TWeaponDto> = [];

    for (let i = 0; i <= region.rewards.count; i += 1) {
        const reward: TItemDto | TWeaponDto = {name: pickRandomElement(region.rewards.items), amount: 1};
        rewards.push(reward);
    }

    enemies.forEach((enemy) => {
        const reward: TItemDto = {name: pickRandomElement(ENEMIES[enemy.name].rewards), amount: 1};
        rewards.push(reward);
    });

    return {
        items: rewards,
        gold: region.rewards.gold
    }
}

export const removeUsedEquipments: (items: Array<TItemDto>, equipments: Array<TItemDto | TWeaponDto>, usedItems: Array<TItemDto | TWeaponDto>) => TEquipmentsUpdate = (items, equipments, usedItems) => {
    const newEquipments = Array.from(equipments);
    const newItems = Array.from(items);

    usedItems.forEach(item => {
        const itemInEquipments = newEquipments.findIndex((e) => e.name === item.name);
        const itemInItems = newItems.findIndex(i => i.name === item.name);

        if (itemInEquipments >= 0) {
            if (newEquipments[itemInEquipments].amount > 1) newEquipments[itemInEquipments].amount -= 1;
            else newEquipments.splice(itemInEquipments, 1);
        }

        if (itemInItems >= 0) {
            if (newItems[itemInItems].amount > 1) newItems[itemInItems].amount -= 1;
            else newItems.splice(itemInItems, 1);
        }
    });

    return {
        newEquipments: newEquipments,
        newItems: newItems
    };
}

export const mergeRewardsInItems: (items: Array<TItemDto>, rewardItems: Array<TItemDto>) => Array<TItemDto> = (items, rewardItems) => {
    const newItems = Array.from(items);

    rewardItems.forEach((rewardItem) => {
        const rewardInItems = newItems.findIndex(i => i.name === rewardItem.name);

        if (rewardInItems >= 0) newItems[rewardInItems].amount += 1;
        else newItems.push({name: rewardItem.name, amount: 1});
    })

    return newItems;
}
