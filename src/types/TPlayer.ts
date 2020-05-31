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
        "Agilität": number
        "Alchemie": number
    }
    items: Array<TItemDto>
    weapons: Array<TWeaponDto>
    equipments: Array<TWeaponDto | TItemDto>
}

export default TPlayer;
