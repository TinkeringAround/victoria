import React, {FC, useContext, useEffect, useState} from 'react';
import {Box, Heading, Image, Text} from "grommet";

import {TCombinationDto} from "../../../../types/TCombination";

import "./style.css";
import {colors} from "../../../../styles/theme";

import SoundContext from "../../../../contexts/SoundContext";

import {random} from "../../../../services/UtilityService";
import {changeColorBrightness} from "../../../../services/ColorService";

import MenuCardComponent from "../../../../components/MenuCardComponent";
import ButtonComponent from "../../../../components/ButtonComponent";

import ITEMS from "../../../../game/Items";

import pot from "../../../../assets/images/pot.png";
import smoke from "../../../../assets/images/smoke.png";
import poop from "../../../../assets/images/poop.png";

const SIZE = 600;
const SMOKE_SIZE = 300;
const RESULT_SIZE = 150;
const RESULT_SIZE_SHORT = 80;

const TOP = {max: 6, min: 1};
const LEFT = [{max: 25, min: 15}, {max: 80, min: 70}, {max: 55, min: 40}];
const ROTATION = [28, 103, 62];
const POT = ["show", "show shake", "show", "lower", "lower"];

interface Props {
    combination: TCombinationDto | null
    onFinished: () => void
}

const CombinationPartial: FC<Props> = ({combination, onFinished}) => {
    const {playEffect} = useContext(SoundContext);
    const [state, setState] = useState(-1);

    useEffect(() => {
        if (state < 0 && combination != null) {
            if (combination.animation === "long") {
                setTimeout(() => setState(4), 10000); // Show Item or Failure Text
                setTimeout(() => setState(3), 7500)  // Pot lowering and scaling Up, Smoke Rising
                setTimeout(() => setState(2), 7000); // Shaking
                setTimeout(() => setState(1), 4000); // Materials in Pot
                setTimeout(() => setState(0), 1000); // Materials appearing
            }

            if (combination.animation === "short") {
                setTimeout(() => setState(1), 1600);
                setTimeout(() => setState(0), 100);
            }
        }

        if (combination == null) setState(-1);
    }, [combination])

    useEffect(() => {
        if (state === 1 && combination != null && combination.animation === "short") onFinished();
        if (state === 0 && combination != null && combination.animation === "short") playEffect("success-short");

        if (state === 1 && combination != null && combination.animation === "long") playEffect("boiling");
        if (state === 3 && combination != null && combination.animation === "long") playEffect("success-long");
    }, [state])

    const isVisible = state > -1;

    return (
        <React.Fragment>
            {/* Long Animation */}
            {combination != null &&
            combination.animation === "long" &&
            <Box
                animation={isVisible ? "fadeIn" : "fadeOut"}
                height={window.innerHeight + "px"}
                width={window.innerWidth + "px"}
                background="dark"
                justify="end"
                align="center"
                style={{position: "absolute", zIndex: isVisible ? 400 : -1}}
            >
                {/* Result */}
                <Box className={"result " + (state === 4 ? "show" : "")}
                     justify="center"
                     align="center"
                >
                    {/* Image or Card */}
                    {combination.name == null ?
                        <Image src={poop}
                               style={{width: RESULT_SIZE, height: RESULT_SIZE}}/> :
                        <MenuCardComponent itemOrWeapon={ITEMS[combination.name]}
                                           amount={null}
                                           selectable={false}
                                           noAnimation
                                           toolTipPosition="right"
                                           size={`${RESULT_SIZE}px`}/>}

                    {/* Text */}
                    <Heading size="4rem"
                             margin="1rem 0 2rem"
                             color="white"
                    >
                        {combination.name == null ?
                            "Das war leider nichts." :
                            <React.Fragment>Du hast <Text size="4rem"
                                                          color="gold">{combination.name}</Text> hergestellt.
                            </React.Fragment>}
                    </Heading>

                    {/* Button */}
                    <ButtonComponent color="white"
                                     background="gold"
                                     hoverColor={changeColorBrightness(colors.gold, -20)}
                                     margin="0"
                                     fontSize="2rem"
                                     onClick={onFinished}
                    >
                        Zum Inventar
                    </ButtonComponent>
                </Box>

                {/* Materials */}
                {state < 2 && combination.materials.map((material, index) => {
                    const top = state < 0 ? "-50%" : (state === 0 ? `${random(TOP.max, TOP.min)}rem` : "40%");
                    const left = state < 0 ? "50%" : (state === 0 ? `${random(LEFT[index].max, LEFT[index].min)}%` : `${random(LEFT[2].max, LEFT[2].min)}%`);
                    const transform = state < 0 ? "rotate(0)" : (state === 0 ? `rotate(${random(180, ROTATION[index])}deg)` : "rotate(0deg)");
                    const opacity = state < 0 ? 0 : (state === 0 ? 1 : 0);

                    return (
                        <Box key={"Combination-" + material + index}
                             className="material"
                             style={{
                                 position: "absolute",
                                 top: top,
                                 left: left,
                                 transform: transform,
                                 opacity: opacity
                             }}>
                            <MenuCardComponent size="120px"
                                               selectable={false}
                                               enabledToolTip={false}
                                               itemOrWeapon={ITEMS[material]}
                                               amount={null}
                                               noAnimation/>
                        </Box>
                    )
                })}

                {/* Smoke */}
                <Box className={"smoke " + (state === 3 ? "show" : "")}
                     width={`${SMOKE_SIZE}px`}
                     height={`${SMOKE_SIZE}px`}
                >
                    <Image src={smoke} style={{width: SMOKE_SIZE, height: SMOKE_SIZE}}/>
                </Box>

                {/* Pot */}
                <Box className={"pot " + (isVisible ? POT[state] : "")}
                     width={SIZE + "px"}
                     height={SIZE + "px"}
                     style={{zIndex: 2}}
                >
                    <Image src={pot} style={{width: SIZE, height: SIZE}}/>
                </Box>
            </Box>}


            {/* Short Animation */}
            {combination != null &&
            combination.animation === "short" &&
            combination.name != null &&
            <Box className={"result-short " + (state > -1 ? "show" : "")}>
                <Heading size="1.25rem"
                         margin="0"
                         color="white"
                         textAlign="center"
                         style={{width: "80%"}}
                >
                    Du hast <Text size="1.25rem" color="gold">{combination.name}</Text> hergestellt.
                </Heading>
                <MenuCardComponent itemOrWeapon={ITEMS[combination.name]}
                                   amount={null}
                                   selected={true}
                                   selectable={false}
                                   noAnimation
                                   enabledToolTip={false}
                                   size={`${RESULT_SIZE_SHORT}px`}/>
            </Box>}
        </React.Fragment>
    );
};

export default CombinationPartial;
