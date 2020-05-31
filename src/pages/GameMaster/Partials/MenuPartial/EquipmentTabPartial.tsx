import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {Box, Heading, Text} from "grommet";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";

import {TWeaponDto} from "../../../../types/TWeapon";
import {TItemDto} from "../../../../types/TItem";

import {colors} from "../../../../styles/theme";

import playerContext from "../../../../contexts/PlayerContext";

import {changeColorBrightness} from "../../../../services/ColorService";
import {move, remove, reorder} from "../../../../services/DragDropService";

import MenuCardComponent from "../../../../components/MenuCardComponent";

import ITEMS from "../../../../game/Items";
import WEAPONS from "../../../../game/Weapons";

const LISTS: Array<string> = ["items", "equipments"]
const ITEMS_WIDTH = "125px";
const ITEM_SIZE = "75px";
const WRAPPER_HEIGHT = "550px";

const EquipmentTabPartial: FC = () => {
    const {player, update} = useContext(playerContext);
    const [itemsAndWeapons, setItemsAndWeapons] = useState<Array<TItemDto | TWeaponDto>>([]);
    const [equipments, setEquipments] = useState<Array<TWeaponDto | TItemDto>>([]);

    useEffect(() => {
        if (player && itemsAndWeapons.length === 0 && equipments.length === 0) {
            let consumables = (player.items.filter((item) => ITEMS[item.name].type === "consumable"));

            if (player.hasOwnProperty("equipments")) {
                player.equipments.forEach((equipment) => {
                    const index = consumables.findIndex((consumable) => consumable.name === equipment.name);

                    if (index >= 0) {
                        if ((consumables[index].amount - 1) === 0) consumables = remove(consumables, index);
                        else consumables[index].amount -= 1;
                    }
                })
                setEquipments(player.equipments);
            }

            setItemsAndWeapons([
                ...consumables,
                ...player.weapons]);
        }
    }, [player])

    useEffect(() => {
        if (player) update({...player, equipments: equipments});
    }, [equipments]);

    const onDragEnd = useCallback((result: DropResult) => {
        const {source, destination} = result;
        const sourceIsItemsOrWeapons = source.droppableId === LISTS[0];

        // Dropped Outside the List from Items
        if (sourceIsItemsOrWeapons && !destination) return;

        // Reorder
        if (destination) {
            if (source.droppableId === destination.droppableId) {
                if (sourceIsItemsOrWeapons) setItemsAndWeapons(reorder(itemsAndWeapons, source.index, destination.index));
                else setEquipments(reorder(equipments, source.index, destination.index));
            } else {
                const {sourceResult, destinationResult} = move(sourceIsItemsOrWeapons ? itemsAndWeapons : equipments,
                    sourceIsItemsOrWeapons ? equipments : itemsAndWeapons, source, destination, sourceIsItemsOrWeapons);
                setItemsAndWeapons(sourceIsItemsOrWeapons ? sourceResult : destinationResult);
                setEquipments(sourceIsItemsOrWeapons ? destinationResult : sourceResult);
            }
        }
    }, [itemsAndWeapons, equipments, setItemsAndWeapons, setEquipments])

    return (
        <Box width="100%"
             height="100%"
             direction="row"
             align="center"
             justify="center"
             style={{
                 position: "relative"
             }}
        >
            {/* Counter */}
            <Box style={{
                position: "absolute",
                bottom: "0.5rem",
                right: "5.5%"
            }}>
                <Text size="1.5rem" weight="bold" color="dark">
                    {`${equipments.length} von max. 30`}
                </Text>
            </Box>

            {/* Heading */}
            <Box width="90%"
                 height="30px"
                 direction="row"
                 justify="between"
                 style={{
                     position: "absolute",
                     top: `calc(calc(calc(100% - ${WRAPPER_HEIGHT}) / 2) - 1rem)`,
                     left: "5%"
                 }}>
                <Heading size="1.75rem"
                         color="dark"
                         margin="0"
                         textAlign="center"
                         style={{
                             width: ITEMS_WIDTH,
                         }}>
                    Inventar
                </Heading>
                <Heading size="1.75rem"
                         color="dark"
                         margin="0"
                         textAlign="center"
                         style={{
                             width: `calc(100% - ${ITEMS_WIDTH} - 2rem)`
                         }}>
                    Ausrüstung
                </Heading>
            </Box>

            {/* All Items */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={LISTS[0]}>
                    {(provided) => (
                        <Box width={ITEMS_WIDTH}
                             height={WRAPPER_HEIGHT}
                             pad="1rem"
                             background="beige"
                             style={{
                                 marginTop: "3rem",
                                 display: "block",
                                 boxShadow: "inset 0px 0px 15px 9px " + changeColorBrightness(colors.beige, -20),
                                 borderRadius: "0.5rem",
                                 overflow: "hidden auto"
                             }}
                             ref={provided.innerRef}
                             {...provided.droppableProps}
                        >
                            {/* Items */}
                            {itemsAndWeapons.map((itemOrWeapon, index) => (
                                <Draggable key={LISTS[0] + itemOrWeapon.name + index}
                                           draggableId={LISTS[0] + itemOrWeapon.name + index}
                                           index={index}
                                >
                                    {(provided1, snapshot) => {
                                        const isItem = ITEMS.hasOwnProperty(itemOrWeapon.name);

                                        return (
                                            <Box ref={provided1.innerRef}
                                                 {...provided1.draggableProps}
                                                 {...provided1.dragHandleProps}
                                            >
                                                <MenuCardComponent
                                                    size={ITEM_SIZE}
                                                    itemOrWeapon={isItem ? ITEMS[itemOrWeapon.name] : WEAPONS[itemOrWeapon.name]}
                                                    mode={2}
                                                    enabledToolTip={!snapshot.isDragging}
                                                    selectable={false}
                                                    amount={isItem ? itemOrWeapon.amount : null}
                                                />
                                            </Box>
                                        )
                                    }}
                                </Draggable>
                            ))}

                            {/* Placeholder*/}
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>

                {/* Equipments */}
                <Droppable droppableId={LISTS[1]} direction="horizontal">
                    {provided => (
                        <Box width={`calc(90% - ${ITEMS_WIDTH} - 2rem)`}
                             height={WRAPPER_HEIGHT}
                             pad="2rem"
                             direction="row"
                             alignContent="start"
                             wrap
                             background="beige"
                             margin={{left: "2rem"}}
                             style={{
                                 marginTop: "3rem",
                                 boxShadow: "inset 0px 0px 15px 9px " + changeColorBrightness(colors.beige, -20),
                                 borderRadius: "0.5rem",
                                 overflow: "hidden auto"
                             }}
                             ref={provided.innerRef}
                             {...provided.droppableProps}
                        >
                            {/* Equipments */}
                            {equipments.map((itemOrWeapon, index) => (
                                <Draggable key={LISTS[1] + itemOrWeapon.name + index}
                                           draggableId={LISTS[1] + itemOrWeapon.name + index}
                                           index={index}
                                >
                                    {(provided1, snapshot) => {
                                        const isItem = ITEMS.hasOwnProperty(itemOrWeapon.name);

                                        return (
                                            <Box ref={provided1.innerRef}
                                                 {...provided1.draggableProps}
                                                 {...provided1.dragHandleProps}
                                            >
                                                <MenuCardComponent
                                                    itemOrWeapon={isItem ? ITEMS[itemOrWeapon.name] : WEAPONS[itemOrWeapon.name]}
                                                    mode={1}
                                                    enabledToolTip={!snapshot.isDragging}
                                                    selectable={false}
                                                    amount={null}
                                                />
                                            </Box>
                                        )
                                    }}
                                </Draggable>
                            ))}

                            {/* Placeholder*/}
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
};

export default EquipmentTabPartial;
