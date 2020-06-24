import {TItemDto} from "./TItem";
import {TWeaponDto} from "./TWeapon";

type TPlayer = {
    level: number
    experience: number
    gold: number
    skills: {
        "Angriff": number
        "Verteidigung": number
        "Handwerk": number
        "Ausdauer": number
        "Alchemie": number
    }
    items: Array<TItemDto>
    weapons: Array<TWeaponDto>
    equipments: Array<TWeaponDto | TItemDto>,
    combinations: Array<string>
}

export default TPlayer;
