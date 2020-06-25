import React, {FC} from 'react';
import {Box, Text} from "grommet";

import {colors} from "../../../../../styles/theme";

import {hexToRgbA} from "../../../../../services/ColorService";

import IconComponent from "../../../../../components/IconComponent";

const CRUCIAL_HEALTH = 3;

interface Props {
    health: number
}

const GamePlayerPartial: FC<Props> = ({health}) => {
    const healthOk = health > CRUCIAL_HEALTH;
    const heartSize = window.innerHeight * 0.125;
    const heartTextSize = (heartSize * 0.25) + "px";

    return (
        <Box width="100%"
             height="50%"
             style={{
                 position: "absolute",
                 bottom: 0,
                 left: "50%",
                 transform: "translateX(-50%)",
                 fill: colors.gold,
                 zIndex: -2
             }}>
            {/* Health */}
            <Box animation={{type: "pulse", duration: healthOk ? 500 : 250, size: healthOk ? "medium" : "large"}}
                 width="100%"
                 height="100%"
                 align="center"
                 justify="center"
                 style={{
                     position: "absolute",
                     bottom: 0,
                     fontSize: heartSize,
                     color: hexToRgbA(healthOk ? colors.green : colors.red, "0.25"),
                     zIndex: -1
                 }}>
                <Text color="light"
                      size={heartTextSize}
                      style={{
                          position: "absolute",
                          left: "50%",
                          transform: "translateX(-50%)",
                          fontWeight: "bold",
                          zIndex: 5
                      }}>
                    {health}
                </Text>
                <IconComponent type="heart"/>
            </Box>

            {/* Logo */}
            <svg width="100%" height="100%" viewBox="0 0 541 433" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1,0,0,1,-386.761,-132.702)">
                    <g id="Horns" transform="matrix(2.87515,0,0,2.87515,150.03,-115.381)">
                        <g transform="matrix(0.354331,0,0,1,76.1139,0)">
                            <path
                                d="M133.146,130.216L146.796,97.769L105.835,129.931L129.077,143.085L67.841,137.762L60.606,124.809L114.339,97.898L50.795,115.388L17.563,86.285L42.962,143.511L147.99,154.137L282.555,236.666L283.358,221.296L182.959,159.406L216.88,134.19L166.742,150.947L133.146,130.216Z"/>
                        </g>
                        <g transform="matrix(-0.354331,0,0,1,276.447,0.284625)">
                            <path
                                d="M133.146,130.216L146.796,97.769L105.835,129.931L129.077,143.085L67.841,137.762L60.606,124.809L114.339,97.898L50.795,115.388L17.563,86.285L42.962,143.511L147.99,154.137L282.834,236.405L283.358,221.296L182.959,159.406L216.88,134.19L166.742,150.947L133.146,130.216Z"/>
                        </g>
                    </g>
                </g>
            </svg>
        </Box>
    );
};

export default GamePlayerPartial;

