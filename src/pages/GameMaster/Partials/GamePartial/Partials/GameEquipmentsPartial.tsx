import React, {FC, useCallback, useEffect, useState} from 'react';
import {Box} from "grommet";

import {TItemDto} from "../../../../../types/TItem";
import {TWeaponDto} from "../../../../../types/TWeapon";

import {generateId} from "../../../../../services/CardService";

import GameCardComponent from "../../../../../components/GameCardComponent";
import ButtonComponent from "../../../../../components/ButtonComponent";
import IconComponent from "../../../../../components/IconComponent";

const MAX_CARDS = 6;

interface Props {
    isVisible: boolean
    delay: number

    round: number
    equipments: Array<TItemDto | TWeaponDto>

    onTurnEquipmentsChange: (turnEquipments: Array<TItemDto | TWeaponDto>) => void
    onTurnEquipmentsReset: () => void
}

const GameEquipmentsPartial: FC<Props> = ({isVisible, delay, round, equipments, onTurnEquipmentsChange, onTurnEquipmentsReset}) => {
    const [turnEquipments, setTurnEquipments] = useState<Array<{ equipment: TItemDto | TWeaponDto, id: string }>>([]);
    const [resetTrigger, setTrigger] = useState(false);

    const onSelectEquipment = useCallback((equipment: TItemDto | TWeaponDto, id: string) => {
        const newTurnEquipments = Array.from(turnEquipments)
        const index = getIndex(id);

        if (index >= 0) newTurnEquipments.splice(index, 1);
        else newTurnEquipments.push({equipment: equipment, id: id})

        onTurnEquipmentsChange(newTurnEquipments.map((turnItem) => turnItem.equipment));
        setTurnEquipments(newTurnEquipments);
    }, [turnEquipments])

    const getIndex = useCallback((id) => turnEquipments.findIndex((turnItem) => turnItem.id.includes(id)), [turnEquipments])

    useEffect(() => {
        if (turnEquipments.length === 0) {
            setTrigger(!resetTrigger);
            onTurnEquipmentsReset();
        }
    }, [turnEquipments])

    return (
        <Box animation={isVisible ? {delay: delay, type: "slideUp", size: "xlarge"} : "fadeOut"}
             width="100%"
             height="150px"
             pad="0 5%"
             direction="row"
             justify="evenly"
             style={{
                 position: "absolute",
                 bottom: 0,
                 left: 0
             }}>

            {/* Clear */}
            <Box style={{
                position: "absolute",
                right: "2rem",
                bottom: "2rem",
                zIndex: 5
            }}
            >
                <ButtonComponent color="light"
                                 background="medium"
                                 hoverColor="dark"
                                 padding="0.5rem 0.75rem"
                                 onClick={() => setTurnEquipments([])}
                >
                    <IconComponent type="close"/>
                </ButtonComponent>
            </Box>

            {/* Background */}
            <Box width={window.innerWidth + "px"}
                 height="50px"
                 background="gold"
                 style={{
                     position: "absolute",
                     left: 0,
                     bottom: 0,
                     zIndex: -1
                 }}/>

            {/* Cards */}
            {equipments.map((equipment, index) => {
                const id = generateId(equipment.name, index, round);
                const calculatedSize = Math.floor(window.innerWidth * 0.9 / 6);
                const size = calculatedSize > 150 ? 150 : calculatedSize;

                return (
                    <React.Fragment key={id}>
                        {index < MAX_CARDS &&
                        <Box style={{position: "relative"}}>
                            <GameCardComponent itemOrWeapon={equipment}
                                               resetSelection={resetTrigger}
                                               index={getIndex(id)}
                                               select={() => onSelectEquipment(equipment, id)}
                                               size={size + "px"}/>
                        </Box>}
                    </React.Fragment>
                )
            })}
        </Box>
    )
}

export default GameEquipmentsPartial;
