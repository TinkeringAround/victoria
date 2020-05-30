import {TItemDto} from "./TItem";
import {TWeaponDto} from "./TWeapon";

type TPlayer = {
    level: number
    experience: number,
    gold: number,
    skills: {
        "Angriff": number
        "Verteidigung": number
        "Handwerk": number
        "Agilität": number
        "Alchemie": number
    }
    items: Array<TItemDto>
    weapons: Array<TWeaponDto>
//    TODO: Add deck
}

export default TPlayer;
