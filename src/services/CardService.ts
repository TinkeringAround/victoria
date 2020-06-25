import {TItem, TItemDto} from "../types/TItem";
import {TWeapon, TWeaponDto} from "../types/TWeapon";
import TPlayer from "../types/TPlayer";

import ITEMS from "../game/Items";
import WEAPONS from "../game/Weapons";
import {getSkillBonus} from "./GameService";
import SKILLS from "../game/Skills";

export const shuffle: (array: Array<TItemDto | TWeaponDto>) => Array<TItemDto | TWeaponDto> = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const generateId: (name: string, index: number, round: number) => string = (name, index, round) => {
    return '_' + name + index + round;
}

export const generateText: (itemOrWeapon: TItem | TWeapon) => string = (itemOrWeapon) => {
    if (itemOrWeapon.hasOwnProperty("value")) {
        return (itemOrWeapon.type === "weapon" ? "Schaden   " : "Verteidigung   ") + (itemOrWeapon as TWeapon).value
    }

    if (itemOrWeapon.hasOwnProperty("effect")) {
        const item = itemOrWeapon as TItem;
        if (item.effect != null) {
            let prefix = "Schaden   ";
            switch (item.effect.target) {
                case "player":
                    prefix = "Leben   ";
                    break;
                case "circle":
                    prefix = "Kreis   "
                    break;
            }

            return prefix + item.effect.value;
        }
    }

    return "";
}

export const generateAction: (itemOrWeapon: TItemDto | TWeaponDto) => string = (itemOrWeapon) => {
    const equipment = ITEMS.hasOwnProperty(itemOrWeapon.name) ? ITEMS[itemOrWeapon.name] : WEAPONS[itemOrWeapon.name];

    if (equipment.hasOwnProperty("value")) {
        const damageOrDefence = (equipment as TWeapon).value;
        return equipment.type === "weapon" ?
            `Füge dem Gegner ${damageOrDefence} Schaden zu.` :
            `Steigere deine Verteidigung um ${damageOrDefence}.`;
    }

    if (equipment.hasOwnProperty("effect")) {
        const item = equipment as TItem;
        return item.effect != null ? item.effect.description : "";
    }

    return "";
}

export const generateSkillBonus: (itemOrWeapon: TItem | TWeapon | TItemDto | TWeaponDto, player: TPlayer | null) => string = (itemOrWeapon, player) => {
    if (player) {
        let bonus;
        const isItem = ITEMS.hasOwnProperty(itemOrWeapon.name);

        if (isItem) {
            bonus = ITEMS[itemOrWeapon.name].effect?.target !== "circle" ?
                getSkillBonus(player, SKILLS["Alchemie"].multiplier) :
                0;
        } else {
            const weapon = WEAPONS[itemOrWeapon.name];
            bonus = weapon.type === "weapon" ?
                getSkillBonus(player, SKILLS["Angriff"].multiplier) :
                getSkillBonus(player, SKILLS["Verteidigung"].multiplier)
        }

        return bonus === 0 ? "" : ` (+${bonus})`;
    }

    return "";
}
