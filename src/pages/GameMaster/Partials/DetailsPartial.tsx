import React, {FC, Fragment, useContext} from 'react';
import {Box, Heading, Paragraph, Text} from "grommet";

import {colors} from "../../../styles/theme";

import GameMasterContext from "../../../contexts/GameMasterContext";

import {changeColorBrightness, hexToRgbA} from "../../../services/ColorService";

import ButtonComponent from "../../../components/ButtonComponent";
import EnemyComponent from "../../../components/EnemyComponent";

import ENEMIES from "../../../game/Enemies";
import LEVELS from "../../../game/Levels";

const ENEMY_SIZE = "85px";

interface Props {
    play: () => void
}

const DetailsPartial: FC<Props> = ({play}) => {
    const {viewMode, level, region, menuTab} = useContext(GameMasterContext);

    const isVisible = !menuTab && ((region !== "" && viewMode === "detail") || (level >= 0 && viewMode === "world"));

    return (
        <Box width="400px"
             height="65%"
             background={hexToRgbA(colors.gold, "0.95")}
             justify="center"
             align="center"
             style={{
                 position: "absolute",
                 bottom: "15%",
                 right: isVisible ? "5%" : "-5%",
                 minHeight: "600px",
                 opacity: isVisible ? 1 : 0,
                 transition: "all 0.5s ease",
                 zIndex: isVisible ? 6 : -1,
                 borderRadius: "1rem",
                 clipPath: "polygon(100% 0, 99% 31%, 100% 100%, 72% 100%, 64% 98%, 59% 100%, 0 100%, 1% 22%, 0 0)",
                 boxShadow: "inset 0px 0px 20px 20px " + changeColorBrightness(colors.gold, -20)
             }}
        >
            <Box width="90%"
                 height="90%"
                 background="light"
                 pad="1rem"
                 align="center"
                 justify="evenly"
                 style={{
                     borderRadius: "1rem",
                     clipPath: "polygon(99% 2%, 100% 58%, 97% 65%, 99% 72%, 100% 100%, 59% 100%, 8% 100%, 0 99%, 1% 0)"
                 }}
            >
                {isVisible &&
                <Fragment>
                    <Heading textAlign="center"
                             margin="1.5rem 0 0"
                    >
                        {level >= 0 && (viewMode === "world" || region === "" ? LEVELS[level].name : LEVELS[level].regions[region].name)}
                    </Heading>

                    {/* World */}
                    {viewMode === "world" &&
                    <Box width="90%"
                         align="center"
                         margin={{bottom: "1rem"}}
                    >
                        {/* Description */}
                        <Paragraph margin="0"
                                   textAlign="center"
                                   style={{fontSize: "1.5rem"}}
                        >
                            {level >= 0 ? LEVELS[level].description : ""}
                        </Paragraph>
                    </Box>}

                    {/* Region */}
                    {viewMode === "detail" &&
                    <Box width="90%"
                         align="center"
                         margin={{bottom: "3rem"}}
                    >
                        {/* Description */}
                        <Paragraph margin="0 0 2rem"
                                   textAlign="center"
                                   style={{fontSize: "1.5rem"}}
                        >
                            {level >= 0 && region !== "" ? LEVELS[level].regions[region].description : ""}
                        </Paragraph>

                        {/* Enemies */}
                        <Box width="100%">
                            {/* Text: Gegner */}
                            <Text color="dark"
                                  size="1.5rem"
                                  weight="bold"
                                  textAlign="center"
                                  margin={{bottom: "1rem"}}
                            >
                                Mögliche Gegner
                            </Text>

                            <Box width="100%"
                                 direction="row"
                                 alignSelf="center"
                                 wrap={false}
                                 align="center"
                                 justify="evenly"
                            >
                                {level >= 0 && region !== "" &&
                                LEVELS[level].regions[region].enemies.map((enemyName: string) =>
                                    <EnemyComponent key={"Enemy-" + enemyName}
                                                    enemy={ENEMIES[enemyName]}
                                                    size={ENEMY_SIZE}
                                    />
                                )}
                            </Box>
                        </Box>
                    </Box>}

                    {/* Button */}
                    <ButtonComponent color="white"
                                     background="gold"
                                     hoverColor={changeColorBrightness(colors.gold, -20)}
                                     onClick={play}
                                     fontSize="1.75rem"
                                     padding="1rem .75rem"
                    >
                        Hinreisen
                    </ButtonComponent>
                </Fragment>}
            </Box>
        </Box>
    );
};

export default DetailsPartial;
