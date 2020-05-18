import React, {FC, useCallback, useContext, useState} from 'react';
import {Box} from "grommet";

import TSkillTypes from "../../../../types/TSkillTypes";
import TPosition from "../../../../types/TPosition";

import PlayerContext from "../../../../contexts/PlayerContext";

import InfoDialogPartial from "./SkillTabPartials/InfoDialogPartial";
import RadarPartial from "./SkillTabPartials/RadarPartial";
import SkillPointsPartial from "./SkillTabPartials/SkillPointsPartial";

interface Props {
    clipPath: string

}

const SkillTabPartial: FC<Props> = ({clipPath}) => {
    const {player} = useContext(PlayerContext);

    const [selectedSkill, selectSkill] = useState<TSkillTypes | null>(null);
    const [position, setPosition] = useState<TPosition>({x: 0, y: 0});

    const improveSkill = () => {
        console.log("TODO: Improve Skill ", selectedSkill);
    }

    const playerSkillPoints = useCallback(() => {
        if (player) {
            return player.level - (player.skills.Angriff + player.skills.Handwerk + player.skills.Verteidigung + player.skills.Agilität + player.skills.Alchemie - 4);
        }
        return 0;
    }, [player])

    return (
        <Box width="100%"
             height="100%"
             direction="row"
             align="center"
             justify="center"
             background="white"
             style={{
                 position: "relative",
                 borderRadius: "1rem",
                 clipPath: clipPath
             }}
        >
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
        </Box>
    );
};

export default SkillTabPartial;
