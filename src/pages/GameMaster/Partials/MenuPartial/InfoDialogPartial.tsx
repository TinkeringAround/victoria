import React, {FC} from 'react';
import {Box, Heading, Paragraph} from "grommet";

import {TSkillTypes} from "../../../../types/TSkillTypes";

import {colors} from "../../../../styles/theme";

import {changeColorBrightness, hexToRgbA} from "../../../../services/ColorService";

import ButtonComponent from "../../../../components/ButtonComponent";

import SKILLS from "../../../../game/Skills";

const INFO_DIALOG_WIDTH = 250;
const INFO_DIALOG_HEIGHT = 280;
const OFFSET_X = 20;
const OFFSET_Y = 60;
const TEXT_WIDTH = 80;

interface Props {
    skill: TSkillTypes
    position: {
        x: number
        y: number
    }
    cancel: () => void
    improveSkill: () => void
    disabled: boolean
}

const InfoDialogPartial: FC<Props> = ({skill, position, cancel, improveSkill, disabled}) => {

    const calcXPosition = () => {
        let xPosition = position.x

        if (["Verteidigung", "Handwerk"].includes(skill)) {
            xPosition -= INFO_DIALOG_WIDTH;
            xPosition -= OFFSET_X;
        }

        if (["Alchemie", "Agilität"].includes(skill)) {
            xPosition += TEXT_WIDTH;
            xPosition += OFFSET_X;
        }

        if (["Angriff"].includes(skill)) {
            xPosition -= (INFO_DIALOG_WIDTH / 2);
            // xPosition += (INFO_DIALOG_WIDTH / 2);
        }

        return xPosition;
    }

    const calcYPosition = () => {
        let yPosition = position.y;

        if (["Handwerk", "Agilität"].includes(skill)) {
            yPosition -= INFO_DIALOG_HEIGHT;
            yPosition += OFFSET_Y;
        }

        if (["Verteidigung", "Alchemie"].includes(skill)) {
            yPosition -= OFFSET_Y;
        }

        if (["Angriff"].includes(skill)) {
            yPosition += OFFSET_Y;
        }

        return yPosition;
    }

    return (
        <Box width={`${INFO_DIALOG_WIDTH}px`}
             background={hexToRgbA(colors.white, "0.85")}
             align="center"
             pad="0.75rem 0.75rem 1rem"
             margin={{bottom: "15%"}}
             style={{
                 position: "fixed",
                 transition: " all 0.25s ease",
                 opacity: skill ? 1 : 0,
                 left: calcXPosition(),
                 top: calcYPosition(),
                 borderRadius: "0.5rem",
                 zIndex: skill ? 1000 : -1
             }}
        >
            <Box width="90%"
                 align="center"
                 margin={{bottom: "1rem"}}
            >
                {/* Heading */}
                <Heading size="2rem"
                         textAlign="center"
                         margin="0"
                >
                    {skill}
                </Heading>

                {/* Description */}
                <Paragraph margin="0"
                           textAlign="center"
                >
                    {SKILLS[skill].description}
                </Paragraph>
            </Box>

            <ButtonComponent color="white"
                             background="medium"
                             hoverColor="dark"
                             fontSize="1.25rem"
                             padding="0.75rem 1rem"
                             margin={{bottom: "1rem"}}
                             onClick={cancel}
            >
                Abbrechen
            </ButtonComponent>
            <ButtonComponent color="white"
                             background="gold"
                             hoverColor={changeColorBrightness(colors.gold, -20)}
                             fontSize="1.25rem"
                             padding="0.75rem 1rem"
                             margin="0"
                             onClick={improveSkill}
                             disabled={disabled}
            >
                Verbessern
            </ButtonComponent>
        </Box>
    );
};

export default InfoDialogPartial;
