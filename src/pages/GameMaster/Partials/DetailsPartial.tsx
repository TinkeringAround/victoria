import React, {FC} from 'react';
import {Box, Heading} from "grommet";

import {colors} from "../../../styles/theme";

import {hexToRgbA} from "../../../services/ColorService";

import ENEMIES from "../../../game/Enemies";
import LEVELS from "../../../game/Levels";

interface Props {
    level: number
    regionName: string
}

const DetailsPartial: FC<Props> = ({level, regionName}) => {

    return (
        <Box width="400px"
             height="60%"
             background={hexToRgbA(colors.light, "0.95")}
             justify="center"
             align="center"
             style={{
                 position: "absolute",
                 bottom: "15%",
                 right: regionName !== "" ? "5%" : "-5%",
                 opacity: regionName !== "" ? 1 : 0,
                 transition: "all 0.5s ease",
                 zIndex: regionName !== "" ? 6 : -1,
                 borderRadius: "1rem",
                 clipPath: "polygon(100% 0, 99% 31%, 100% 100%, 72% 100%, 64% 98%, 59% 100%, 0 100%, 1% 22%, 0 0)"
             }}
        >
            <Box width="90%"
                 height="90%"
                 background="gold"
                 pad="1rem"
                 style={{
                     borderRadius: "1rem",
                     clipPath: "polygon(99% 2%, 100% 58%, 97% 65%, 99% 72%, 100% 100%, 59% 100%, 8% 100%, 0 99%, 1% 0)"
                 }}
            >
                <Heading textAlign="center">{level >= 0 ? LEVELS[level].name : ""}</Heading>

                <Box width="100%" direction="row" wrap={false} justify="around" align="center">
                    {level >= 0 && regionName !== "" && LEVELS[level].regions["MotherTree"].enemies.map((enemy: number) =>
                        <Box key={"Enemy-" + enemy}
                             width="100px"
                             height="100px"
                             background="medium">
                            {ENEMIES[enemy].name}
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default DetailsPartial;
