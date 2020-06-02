import React, {FC, useContext, useEffect, useState} from 'react';
import {Box} from "grommet";

import {TItem, TItemDto, TItemType} from "../../../../types/TItem";
import {TWeapon, TWeaponDto, TWeaponType} from "../../../../types/TWeapon";

import {colors} from "../../../../styles/theme";

import playerContext from "../../../../contexts/PlayerContext";

import {changeColorBrightness} from "../../../../services/ColorService";

import HeadingPartial from "./InventarTabPartials/HeadingPartial";

import MenuCardComponent from "../../../../components/MenuCardComponent";

import ITEMS from "../../../../game/Items";
import WEAPONS from "../../../../game/Weapons";

const InventarTabPartial: FC = () => {
    const {player} = useContext(playerContext);
    const [items, setItems] = useState<Array<TItemDto>>([]);
    const [weapons, setWeapons] = useState<Array<TWeaponDto>>([]);
    const [typeFilter, setTypeFilter] = useState<TItemType | TWeaponType>("material");
    const [materials, setMaterials] = useState<Array<string>>([]);

    useEffect(() => {
        if (player) {
            setItems(player.items);
            setWeapons(player.weapons);
        }
    }, [player])

    const selectMaterial = (item: TItem | TWeapon) => {
        const materialIndex = materials.indexOf(item.name);
        const newMaterials = Array.from(materials);

        if (materialIndex < 0) newMaterials.push(item.name);
        else newMaterials.splice(materialIndex, 1);

        setMaterials(newMaterials);
    }

    return (
        <React.Fragment>
            {/* Heading */}
            <HeadingPartial filter={typeFilter} setFilter={setTypeFilter}/>

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
