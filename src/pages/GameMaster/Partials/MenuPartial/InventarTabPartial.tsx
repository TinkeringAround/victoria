import React, {FC, useContext, useEffect, useState} from 'react';
import {Box} from "grommet";

import {TItem, TItemDto, TItemType} from "../../../../types/TItem";
import {TWeapon, TWeaponDto, TWeaponType} from "../../../../types/TWeapon";

import {colors} from "../../../../styles/theme";

import PlayerContext from "../../../../contexts/PlayerContext";
import GameMasterContext from "../../../../contexts/GameMasterContext";

import {changeColorBrightness} from "../../../../services/ColorService";

import HeadingPartial from "./InventarTabPartials/HeadingPartial";
import CombinePartial from "./InventarTabPartials/CombinePartial";

import MenuCardComponent from "../../../../components/MenuCardComponent";

import ITEMS from "../../../../game/Items";
import WEAPONS from "../../../../game/Weapons";
import COMBINATIONS from "../../../../game/Combinations";

const InventarTabPartial: FC = () => {
    const {player} = useContext(PlayerContext);
    const {executeCombination} = useContext(GameMasterContext);
    const [typeFilter, setTypeFilter] = useState<TItemType | TWeaponType>("material");

    const [items, setItems] = useState<Array<TItemDto>>([]);
    const [weapons, setWeapons] = useState<Array<TWeaponDto>>([]);
    const [materials, setMaterials] = useState<Array<string>>([]);

    useEffect(() => {
        if (player) {
            setItems(player.items);
            setWeapons(player.weapons);
        }
    }, [player])

    useEffect(() => {
        if (materials.length > 0) setMaterials([]);
    }, [typeFilter])

    const selectMaterial = (item: TItem | TWeapon) => {
        const materialIndex = materials.indexOf(item.name);
        const newMaterials = Array.from(materials);

        if (materialIndex < 0) newMaterials.push(item.name);
        else newMaterials.splice(materialIndex, 1);

        setMaterials(newMaterials);
    }

    const onCombineMaterials = () => {
        if (player) {
            let fulfilledCombination = null;
            for (const combination in COMBINATIONS) {
                if (COMBINATIONS[combination].requirements.every((requirement) => materials.includes(requirement))) {
                    fulfilledCombination = combination;
                    break;
                }
            }

            if (fulfilledCombination != null) {
                const combinationIsDiscovered = player.combinations.includes(fulfilledCombination);
                executeCombination(fulfilledCombination, materials, combinationIsDiscovered ? "short" : "long");
            } else executeCombination(null, materials, "long");

            setMaterials([]);
        }
    }

    return (
        <React.Fragment>
            {/* Heading */}
            <HeadingPartial filter={typeFilter} setFilter={setTypeFilter}/>

            {/* Combination Button */}
            <CombinePartial isVisible={materials.length >= 2 && materials.length < 4} onClick={onCombineMaterials}/>

            {/* Player Items */}
            <Box width="90%"
                 height="70%"
                 pad="2rem"
                 background="beige"
                 direction="row"
                 alignContent="start"
                 wrap
                 style={{
                     boxShadow: "inset 0px 0px 15px 9px " + changeColorBrightness(colors.beige, -20),
                     borderRadius: "0.5rem"
                 }}
            >
                {/* Items */}
                {items.map((item: TItemDto) =>
                    <React.Fragment key={"Item-" + item.name}>
                        {ITEMS[item.name].type === typeFilter &&
                        <MenuCardComponent itemOrWeapon={ITEMS[item.name]}
                                           selected={materials.includes(item.name)}
                                           selectable={ITEMS[item.name].type === "material"}
                                           select={ITEMS[item.name].type === "material" ? selectMaterial : null}
                                           amount={item.amount}/>}
                    </React.Fragment>)}

                {/* Weapons */}
                {weapons.map((weapon: TWeaponDto) =>
                    <React.Fragment key={"Weapon-" + weapon.name}>
                        {WEAPONS[weapon.name].type === typeFilter &&
                        <MenuCardComponent itemOrWeapon={WEAPONS[weapon.name]}
                                           amount={null}/>}
                    </React.Fragment>)}
            </Box>
        </React.Fragment>
    );
};

export default InventarTabPartial;
