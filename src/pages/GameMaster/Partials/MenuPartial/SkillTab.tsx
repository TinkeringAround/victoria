import React, {FC, useState} from 'react';
import {Box} from "grommet";

import {TSkillTypes} from "../../../../types/TSkillTypes";
import {TPosition} from "../../../../types/TPosition";

import InfoDialogPartial from "./InfoDialogPartial";
import RadarPartial from "./RadarPartial";
import SideBar from "./SideBar";

const data = [
    {
        "skill": "Angriff",
        "Victoria": 2
    },
    {
        "skill": "Verteidigung",
        "Victoria": 1,
    },
    {
        "skill": "Handwerk",
        "Victoria": 3,
    },
    {
        "skill": "Agilität",
        "Victoria": 4,
    },
    {
        "skill": "Alchemie",
        "Victoria": 6,
    }
]


const SkillTab: FC = () => {
    const [selectedSkill, selectSkill] = useState<TSkillTypes | null>(null);
    const [position, setPosition] = useState<TPosition>({
        x: 0,
        y: 0
    });

    const improveSkill = () => {
        console.log("TODO: Improve Skill ", selectedSkill);
    }

    return (
        <Box width="100%"
             height="100%"
             direction="row"
             align="center"
             style={{
                 position: "relative"
             }}
        >
            {/* Radar */}
            <RadarPartial data={data}
                          setPosition={setPosition}
                          selectSkill={selectSkill}/>

            {/* Side Bar */}
            <SideBar/>

            {/* Info Dialog */}
            {selectedSkill && <InfoDialogPartial skill={selectedSkill}
                                                 position={position}
                                                 cancel={() => selectSkill(null)}
                                                 improveSkill={improveSkill}
                                                 disabled={true}/>}
        </Box>
    );
};

export default SkillTab;
