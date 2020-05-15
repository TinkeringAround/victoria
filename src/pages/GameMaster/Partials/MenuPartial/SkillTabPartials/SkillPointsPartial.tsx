import React, {FC, useContext, useEffect, useState} from 'react';
import {ResponsivePie} from "@nivo/pie";
import {Box, Text} from "grommet";

import {colors} from "../../../../../styles/theme";

import PlayerContext from "../../../../../contexts/PlayerContext";

import {hexToRgbA} from "../../../../../services/ColorService";

const SIZE = 150;

interface Props {
    skillPoints: number
}

const SkillPointsPartial: FC<Props> = ({skillPoints}) => {
    const {player} = useContext(PlayerContext);

    const [data, setData] = useState<Array<any>>([])

    useEffect(() => {
        if (data.length === 0 && player) {
            setData([
                {
                    "id": "Erfahrung",
                    "label": "Erfahrung",
                    "value": 67,
                },
                {
                    "id": "",
                    "label": "",
                    "value": 100 - 67,
                }
            ])
        }
    }, [player])

    return (
        <Box width={`${SIZE}px`}
             height={`${SIZE}px`}
             background="beige"
             pad="1rem"
             style={{
                 position: "absolute",
                 top: "1.5rem",
                 right: "1.5rem",
                 borderRadius: "50%"
             }}>

            {/* Experience */}
            <ResponsivePie
                data={data}
                margin={{top: 0, right: 0, bottom: 0, left: 0}}
                innerRadius={0.8}
                colors={[colors.gold, hexToRgbA(colors.gold, "0.2")]}
                enableRadialLabels={false}
                enableSlicesLabels={false}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                isInteractive={false}
                defs={[]}
                fill={[]}
                legends={[]}
            />

            {/* Skill Points */}
            <Box width="100%"
                 style={{
                     position: "absolute",
                     top: "2.5rem",
                     left: 0,
                     textAlign: "center",
                     color: colors.dark
                 }}>
                <Text size="2.5rem"
                      weight="bold">
                    {skillPoints}
                </Text>
                <Text size="0.75rem">
                    Fähigkeitspunkte
                </Text>
            </Box>
        </Box>
    );
};

export default SkillPointsPartial;
