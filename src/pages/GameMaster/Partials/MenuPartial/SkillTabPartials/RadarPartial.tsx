import React, {FC, useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {ResponsiveRadar} from "@nivo/radar";
import {Box} from "grommet";

import TSkillTypes from "../../../../../types/TSkillTypes";

import {colors} from "../../../../../styles/theme";

import PlayerContext from "../../../../../contexts/PlayerContext";

const SText = styled.text`
    font-size: 1.5rem;
    font-weight: bold;
    
    fill: ${colors.dark};
    
    cursor: pointer;
    
    :hover {
        fill: ${colors.gold};
    }
`

interface Props {
    selectSkill: (skill: TSkillTypes) => void
}

const RadarPartial: FC<Props> = ({selectSkill}) => {
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
                    "skill": "Ausdauer",
                    "Victoria": player.skills.Ausdauer,
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
            <SText onClick={() => selectSkill(id as TSkillTypes)}>
                {id}
            </SText>
        </g>

    return (
        <Box width="80%"
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
