import React, {FC, useEffect, useState} from 'react';
import {Box} from "grommet";

import {TSkillTypes} from "../../../../types/TSkillTypes";
import {TPosition} from "../../../../types/TPosition";
import TSize from "../../../../types/TSize";

import InfoDialogPartial from "./InfoDialogPartial";
import RadarPartial from "./RadarPartial";
import SideBarPartial from "./SideBarPartial";

import CLASSNAMES from "../../../classNames";

const data = [
    {
        "skill": "Alchemie",
        "Victoria": 6,
    },
    {
        "skill": "Agilität",
        "Victoria": 4,
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
        "skill": "Angriff",
        "Victoria": 2
    }
]

const SkillTabPartial: FC = () => {
    const [selectedSkill, selectSkill] = useState<TSkillTypes | null>(null);
    const [position, setPosition] = useState<TPosition>({
        x: 0,
        y: 0
    });
    const [size, setSize] = useState<TSize | null>(null);

    const improveSkill = () => {
        console.log("TODO: Improve Skill ", selectedSkill);
    }

    useEffect(() => {
        if (!size) {
            const skillTab = document.getElementsByClassName(CLASSNAMES.SkillTab)[0];
            if (skillTab != null) {
                setSize({
                    height: skillTab.getBoundingClientRect().height * 0.9,
                    width: skillTab.getBoundingClientRect().width / 2
                });
            }
        }
    }, [])

    return (
        <Box className={CLASSNAMES.SkillTab}
             width="100%"
             height="100%"
             direction="row"
             align="center"
             justify="around"
             style={{
                 position: "relative"
             }}
        >
            {/* Radar */}
            {size && <RadarPartial data={data}
                                   setPosition={setPosition}
                                   selectSkill={selectSkill}
                                   size={size}/>}

            {/* Side Bar */}
            {size && <SideBarPartial size={size} level={10}/>}

            {/* Info Dialog */}
            {selectedSkill && <InfoDialogPartial skill={selectedSkill}
                                                 position={position}
                                                 cancel={() => selectSkill(null)}
                                                 improveSkill={improveSkill}
                                                 disabled={true}/>}
        </Box>
    );
};

export default SkillTabPartial;
