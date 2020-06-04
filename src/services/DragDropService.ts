import {TItemDto} from "../types/TItem";
import {TWeaponDto} from "../types/TWeapon";
import {DraggableLocation} from "react-beautiful-dnd";

import WEAPONS from "../game/Weapons";
import ITEMS from "../game/Items";

export const remove = (list: Array<TItemDto | TWeaponDto>, index: number) => {
    const result = Array.from(list);
    result.splice(index, 1);

    return result;
}

export const reorder = (list: Array<TItemDto | TWeaponDto>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}


export const move = (source: Array<TItemDto | TWeaponDto>, destination: Array<TItemDto | TWeaponDto>, droppableSource: DraggableLocation, droppableDestination: DraggableLocation, sourceIsItemsAndWeapons: boolean) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);

    const draggedItemOrWeapon = sourceClone[droppableSource.index];

    if (sourceIsItemsAndWeapons && destClone.length < 30) {
        // Destination
        destClone.splice(droppableDestination.index, 0, {
            name: draggedItemOrWeapon.name,
            amount: 1
        });

        // Source
        if (!WEAPONS.hasOwnProperty(draggedItemOrWeapon.name)) {
            if ((draggedItemOrWeapon.amount - 1) <= 0) sourceClone.splice(droppableSource.index, 1);
            else sourceClone[droppableSource.index].amount -= 1;
        }
    }

    if (!sourceIsItemsAndWeapons) {
        // Destination
        const draggedItemOrWeaponIndexInDestination = destClone.findIndex((itemOrWeapon) => itemOrWeapon.name === draggedItemOrWeapon.name);
        if (draggedItemOrWeaponIndexInDestination < 0) destClone.splice(droppableDestination.index, 0, {
            name: draggedItemOrWeapon.name,
            amount: 1
        });
        else {
            const isItem = ITEMS.hasOwnProperty(draggedItemOrWeapon.name);
            if (isItem) destClone[draggedItemOrWeaponIndexInDestination].amount += 1;
        }

        // Source
        sourceClone.splice(droppableSource.index, 1);
    }

    return {
        sourceResult: sourceClone,
        destinationResult: destClone
    };
};
