import TEnemyDto from "./TEnemyDto";
import {TItemDto} from "./TItem";
import {TWeaponDto} from "./TWeapon";

type TGameState = {
    health: number
    equipments: Array<TItemDto | TWeaponDto>

    enemyIndex: number
    enemies: Array<TEnemyDto>
}

export default TGameState;
