import React, {FC, useContext} from 'react';
import {Box, Text} from "grommet";

import {TItemDto} from "../../../../../types/TItem";
import {TWeaponDto} from "../../../../../types/TWeapon";

import {colors} from "../../../../../styles/theme";

import PlayerContext from "../../../../../contexts/PlayerContext";

import {generateAction, generateSkillBonus} from "../../../../../services/CardService";
import {changeColorBrightness} from "../../../../../services/ColorService";

import ButtonComponent from "../../../../../components/ButtonComponent";

interface Props {
    turnActions: Array<TItemDto | TWeaponDto>
    applyActions: () => void
}

const GameTurnActionsPartial: FC<Props> = ({turnActions, applyActions}) => {
    const {player} = useContext(PlayerContext);

    return (
        <Box style={{
            position: "absolute",
            left: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            transition: "all 1s ease",
            opacity: turnActions.length > 0 ? 1 : 0
        }}>
            {/* Actions */}
            {turnActions.map((action, index) =>
                <Text key={"Action" + action.name + index}
                      size="1.5rem"
                      margin={{bottom: "0.25rem"}}
                >
                        <span style={{fontSize: "2rem", color: colors.gold}}>
                            {(index + 1) + ".   "}
                        </span>
                    {generateAction(action)}
                    <span style={{color: colors.green}}>{generateSkillBonus(action, player)}</span>
                </Text>
            )}

            {/* Start Turn Button */}
            {turnActions.length > 0 &&
            <Box margin={{top: "1rem"}}
                 style={{maxWidth: 175}}
            >
                <ButtonComponent color="light"
                                 background="gold"
                                 hoverColor={changeColorBrightness(colors.gold, -20)}
                                 onClick={applyActions}
                                 fontSize="1.5rem"
                                 padding="1rem 0.75rem"
                >
                    Runde starten
                </ButtonComponent>
            </Box>}

        </Box>
    )
}


export default GameTurnActionsPartial;
