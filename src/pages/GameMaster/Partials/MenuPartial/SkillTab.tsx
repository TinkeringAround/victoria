import React, {FC, useState} from 'react';
import {Box, Heading, Paragraph} from "grommet";
import {ResponsiveRadar} from '@nivo/radar'
import styled from "styled-components";

import {TSkillTypes} from "../../../../types/TSkillTypes";

import {colors} from '../../../../styles/theme';

import SKILLS from "../../../../game/Skills";

import ButtonComponent from "../../../../components/ButtonComponent";
import {changeColorBrightness} from "../../../../services/ColorService";

const SText = styled.text`
    font-size: 1.5rem;
    font-family: Chinese Rocks;
    
    fill: ${colors.dark};
    
    cursor: pointer;
    
    :hover {
        fill: ${colors.gold};
    }
`

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

    const improveSkill = () => {
        console.log("TODO: Improve Skill ", selectedSkill);
    }

    // @ts-ignore
    const GridLabel = ({id, anchor}) =>
        <g transform={`translate(${anchor === 'end' ? -70 : anchor === 'middle' ? -25 : 0}, 0)`}
           onClick={() => selectSkill(id as TSkillTypes)}>
            <SText>
                {id}
            </SText>
        </g>


    return (
        <Box
            width="100%"
            height="100%"
            direction="row"
            align="center"
            justify="center"
            style={{
                position: "relative"
            }}
        >
            {/* Radar */}
            <Box width="80%"
                 height="90%"
                 style={{
                     position: "relative",
                     transition: "all 0.25s ease",
                     left: selectedSkill ? "-5%" : "10%"
                 }}
            >
                <ResponsiveRadar
                    data={data}
                    keys={['Victoria']}
                    indexBy="skill"
                    maxValue={10}
                    margin={{top: 70, right: 80, bottom: 40, left: 80}}
                    curve="linearClosed"
                    borderWidth={1}
                    borderColor={colors.red}
                    gridLevels={5}
                    gridShape="linear"
                    // @ts-ignore
                    gridLabel={GridLabel}
                    gridLabelOffset={36}

                    enableDots={true}
                    dotColor={colors.red}
                    dotBorderWidth={5}

                    colors={colors.red}
                    fillOpacity={0.25}
                    blendMode="multiply"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    isInteractive={true}
                    legends={[]}
                />
            </Box>

            {/* SideBar */}
            <Box
                width="20%"
                justify="end"
                background="light"
                align="center"
                pad="1rem"
                alignSelf="end"
                margin={{bottom: "15%"}}
                style={{
                    position: "relative",
                    transition: " all 0.25s ease",
                    opacity: selectedSkill ? 1 : 0,
                    left: selectedSkill ? 0 : "20%",
                    borderRadius: "1rem"
                }}
            >
                <Box width="90%"
                     align="center"
                     margin={{bottom: "1rem"}}
                >
                    {/* Heading */}
                    <Heading size="2rem"
                             textAlign="center"
                             margin="1.5rem 0 0"
                    >
                        {selectedSkill}
                    </Heading>

                    {/* Description */}
                    <Paragraph margin="0 0 3rem 0"
                               textAlign="center"
                    >
                        {selectedSkill != null && SKILLS[selectedSkill].description}
                    </Paragraph>
                </Box>

                <ButtonComponent color="white"
                                 background="medium"
                                 hoverColor="dark"
                                 fontSize="1.25rem"
                                 padding="0.75rem 1rem"
                                 margin={{bottom: "1rem"}}
                                 onClick={() => selectSkill(null)}
                >
                    Abbrechen
                </ButtonComponent>
                <ButtonComponent color="white"
                                 background="gold"
                                 hoverColor={changeColorBrightness(colors.gold, -20)}
                                 fontSize="1.25rem"
                                 padding="0.75rem 1rem"
                                 margin="0"
                                 onClick={improveSkill}
                >
                    Verbessern
                </ButtonComponent>
            </Box>
        </Box>
    );
};

export default SkillTab;
