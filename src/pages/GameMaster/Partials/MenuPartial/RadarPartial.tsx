import React, {FC} from 'react';
import styled from "styled-components";
import {ResponsiveRadar} from "@nivo/radar";
import {Box} from "grommet";

import {TSkillTypes} from "../../../../types/TSkillTypes";
import {TPosition} from "../../../../types/TPosition";
import TSize from "../../../../types/TSize";

import {colors} from "../../../../styles/theme";

import CLASSNAMES from "../../../classNames";
import {hexToRgbA} from "../../../../services/ColorService";

const SText = styled.text`
    font-size: 1.5rem;
    font-family: Chinese Rocks;
    
    fill: ${colors.dark};
    
    cursor: pointer;
    
    :hover {
        fill: ${colors.gold};
    }
`

interface Props {
    data: any
    setPosition: (position: TPosition) => void
    selectSkill: (skill: TSkillTypes) => void

    size: TSize
}

const RadarPartial: FC<Props> = ({data, setPosition, selectSkill, size}) => {

    // @ts-ignore
    const GridLabel = ({id, anchor}) =>
        <g transform={`translate(${anchor === 'end' ? -70 : anchor === 'middle' ? -25 : 0}, 0)`}>
            <SText onClick={() => {
                const radar = document.getElementsByClassName(CLASSNAMES.Radar);
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
        <Box className={CLASSNAMES.Radar}
             background={hexToRgbA(colors.white, "0.5")}
             width={`${size.width * 1.3}px`}
             height={`${size.height}px`}
             pad="1rem"
             style={{
                 borderRadius: "1rem",
                 border: "solid 3px " + colors.gold
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
