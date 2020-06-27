import {TItemDto} from "./TItem";
import {TWeaponDto} from "./TWeapon";

type TEquipmentsUpdate = {
    newItems: Array<TItemDto | TWeaponDto>
    newEquipments: Array<TItemDto | TWeaponDto>
}

export default TEquipmentsUpdate;
