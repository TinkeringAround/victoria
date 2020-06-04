import React, {FC, useCallback, useContext, useState} from 'react';

import TSkillTypes from "../../../../types/TSkillTypes";
import TPosition from "../../../../types/TPosition";

import PlayerContext from "../../../../contexts/PlayerContext";

import InfoDialogPartial from "./SkillTabPartials/InfoDialogPartial";
import RadarPartial from "./SkillTabPartials/RadarPartial";
import SkillPointsPartial from "./SkillTabPartials/SkillPointsPartial";

const SkillTabPartial: FC = () => {
    const {player, update} = useContext(PlayerContext);

    const [selectedSkill, selectSkill] = useState<TSkillTypes | null>(null);
    const [position, setPosition] = useState<TPosition>({x: 0, y: 0});

    const improveSkill = () => {
        if (player && selectedSkill) {
            const updatedSkills = player.skills;
            updatedSkills[selectedSkill] += 1;

            selectSkill(null);
            update({...player, skills: updatedSkills});
        }
    }

    const playerSkillPoints = useCallback(() => {
        if (player) {
            return player.level - (player.skills.Angriff + player.skills.Handwerk + player.skills.Verteidigung + player.skills.Agilität + player.skills.Alchemie - 4);
        }
        return 0;
    }, [player])

    return (
        <React.Fragment>
            {/* Skill Points */}
            <SkillPointsPartial skillPoints={playerSkillPoints()}/>

            {/* Radar */}
            <RadarPartial setPosition={setPosition}
                          selectSkill={selectSkill}/>


            {/* Info Dialog */}
            {selectedSkill && <InfoDialogPartial skill={selectedSkill}
                                                 position={position}
                                                 cancel={() => selectSkill(null)}
                                                 improveSkill={improveSkill}
                                                 disabled={playerSkillPoints() === 0}/>}
        </React.Fragment>
    );
};

export default SkillTabPartial;
