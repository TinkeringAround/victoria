import {TItemDto} from "./TItem";

type TPlayer = {
    level: number
    experience: number,
    skills: {
        "Angriff": number
        "Verteidigung": number
        "Handwerk": number
        "Agilität": number
        "Alchemie": number
    }
    items: Array<TItemDto>
}

export default TPlayer;
