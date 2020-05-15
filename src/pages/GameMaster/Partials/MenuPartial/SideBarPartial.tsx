import React, {FC} from 'react';
import {Box, Heading, Image, Text} from "grommet";
import {ResponsivePie} from '@nivo/pie'

import TSize from "../../../../types/TSize";

import {colors} from "../../../../styles/theme";

import {hexToRgbA} from "../../../../services/ColorService";

import placeholder from "../../../../assets/images/placeholder.png";

const data = [
    {
        "id": "Erfahrung",
        "label": "Erfahrung",
        "value": 45,
    },
    {
        "id": "",
        "label": "",
        "value": 55,
    }
]

interface Props {
    size: TSize

    level: number
}

const SideBarPartial: FC<Props> = ({size, level}) =>
    <Box width={`${size.width * 0.4}px`}
         height={`${size.height}px`}
         align="center"
         alignSelf="center"
         background={hexToRgbA(colors.white, "0.5")}
         pad="1rem"
         style={{
             position: "relative",
             clipPath: "polygon(0 0, 10% 3%, 25% 1%, 40% 3%, 50% 0, 60% 3%, 75% 1%, 90% 3%, 100% 0, 100% 100%, 0 100%)",
             borderRadius: "1rem",
             boxShadow: hexToRgbA(colors.dark, "0.01") + " 0px 0px 20px 20px",
             border: "solid 3px " + colors.gold
         }}
    >
        {/* Name */}
        <Box width="100%"
             height="75px"
             background="gold"
             justify="end"
             style={{
                 position: "absolute",
                 top: 0,
                 zIndex: 3,
                 borderTopLeftRadius: 10,
                 borderTopRightRadius: 10
             }}
        >
            <Heading size="2rem"
                     margin="0 0 0.25rem"
                     textAlign="center"
                     color="white"
            >
                Victoria
            </Heading>
        </Box>

        {/* Image */}
        <Box width="100%"
             height="60%"
             style={{
                 opacity: 0.1 // TODO: Remove and Add correct Image
             }}>
            <Image src={placeholder} fit="cover"/>
        </Box>

        {/* Bottom */}
        <Box height="40%"
             width="100%"
             style={{
                 position: "absolute",
                 bottom: 0,
                 zIndex: 2
             }}>

            {/* Stufe */}
            <Box width="100%"
                 direction="row"
                 align="center"
                 justify="center"
                 background="gold"
                 style={{
                     position: "absolute",
                     top: 0,
                     color: colors.white
                 }}
            >
                <Text size="1rem"
                      margin="0 .5rem 0 0"
                >
                    Stufe
                </Text>
                <Text size="2rem"
                      weight="bold"
                      margin="0 1rem 0 0"
                      style={{
                          fontFamily: "Roboto"
                      }}
                >
                    {level}
                </Text>

            </Box>

            {/* Experience */}
            <ResponsivePie
                data={data}
                margin={{top: 60, right: 40, bottom: 20, left: 40}}
                innerRadius={0.8}
                colors={[colors.gold, hexToRgbA(colors.dark, "0.2")]}
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
                 pad="1rem"
                 style={{
                     position: "absolute",
                     top: "30%",
                     textAlign: "center",
                     color: colors.dark
                 }}>
                <Text size="3.5rem"
                      weight="bold">
                    0
                </Text>
                <Text size="1rem">
                    Fähigkeitspunkte
                </Text>
            </Box>
        </Box>

    </Box>

export default SideBarPartial;
