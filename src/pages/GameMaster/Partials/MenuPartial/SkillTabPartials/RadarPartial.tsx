import React, {FC, useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {ResponsiveRadar} from "@nivo/radar";
import {Box} from "grommet";

import TSkillTypes from "../../../../../types/TSkillTypes";
import TPosition from "../../../../../types/TPosition";

import {colors} from "../../../../../styles/theme";

import PlayerContext from "../../../../../contexts/PlayerContext";

const SText = styled.text`
    font-size: 1.5rem;
    font-family: Chinese Rocks;
    
    fill: ${colors.dark};
    
    cursor: pointer;
    
    :hover {
        fill: ${colors.gold};
    }
`

const CLASSNAME = "RadarParial";

interface Props {
    setPosition: (position: TPosition) => void
    selectSkill: (skill: TSkillTypes) => void
}

const RadarPartial: FC<Props> = ({setPosition, selectSkill}) => {
    const {player} = useContext(PlayerContext);
    const [data, setData] = useState<Array<any>>([]);

    useEffect(() => {
        if (player) {
            setData([
                {
                    "skill": "Alchemie",
                    "Victoria": player.skills.Alchemie,
                },
                {
                    "skill": "Agilität",
                    "Victoria": player.skills.Agilität,
                },
                {
                    "skill": "Verteidigung",
                    "Victoria": player.skills.Verteidigung,
                },
                {
                    "skill": "Handwerk",
                    "Victoria": player.skills.Handwerk,
                },
                {
                    "skill": "Angriff",
                    "Victoria": player.skills.Angriff
                }
            ])
        }
    }, [player])


    // @ts-ignore
    const GridLabel = ({id, anchor}) =>
        <g transform={`translate(${anchor === 'end' ? -70 : anchor === 'middle' ? -25 : 0}, 0)`}>
            <SText onClick={() => {
                const radar = document.getElementsByClassName(CLASSNAME);
                //@ts-ignore
                const boundingRect = radar.item(0).getBoundingClientRect();
                setPosition({
                    x: boundingRect.x + (boundingRect.width / 2),
                    y: boundingRect.y + (boundingRect.height / 2)
                });
                selectSkill(id as TSkillTypes)
            }}>
                {id}
            </SText>
        </g>

    return (
        <Box className={CLASSNAME}
             width="80%"
             height="90%"
             pad="1rem"
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
                gridShape="circular"
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
    );
};

export default RadarPartial;
