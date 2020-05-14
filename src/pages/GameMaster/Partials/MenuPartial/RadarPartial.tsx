import React, {FC} from 'react';
import styled from "styled-components";
import {ResponsiveRadar} from "@nivo/radar";
import {Box} from "grommet";

import {TSkillTypes} from "../../../../types/TSkillTypes";
import {TPosition} from "../../../../types/TPosition";

import {colors} from "../../../../styles/theme";

const SText = styled.text`
    font-size: 1.5rem;
    font-family: Chinese Rocks;
    
    fill: ${colors.dark};
    
    cursor: pointer;
    
    :hover {
    }
`

interface Props {
    data: any
    setPosition: (position: TPosition) => void
    selectSkill: (skill: TSkillTypes) => void
}

const RadarPartial: FC<Props> = ({data, setPosition, selectSkill}) => {
    // @ts-ignore
    const GridLabel = ({id, anchor}) =>
        <g transform={`translate(${anchor === 'end' ? -70 : anchor === 'middle' ? -25 : 0}, 0)`}>
            <SText onClick={(event: any) => {
                //@ts-ignore
                const boundingRect = event.target.getBoundingClientRect();
                setPosition({
                    x: boundingRect.x,
                    y: boundingRect.y
                });
                selectSkill(id as TSkillTypes)
            }}>
                {id}
            </SText>
        </g>

    return (
        <Box height="90%"
             width="calc(100% - 250px)"
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
