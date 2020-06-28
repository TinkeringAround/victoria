import React, {FC} from 'react';
import {Box, Heading, Paragraph} from "grommet";

import TSkillTypes from "../../../../../types/TSkillTypes";

import {colors} from "../../../../../styles/theme";

import {changeColorBrightness} from "../../../../../services/ColorService";

import ButtonComponent from "../../../../../components/ButtonComponent";

import SKILLS from "../../../../../game/Skills";

const INFO_DIALOG_WIDTH = 300;

interface Props {
    skill: TSkillTypes
    cancel: () => void
    improveSkill: () => void
    disabled: boolean
}

const InfoDialogPartial: FC<Props> = ({skill, cancel, improveSkill, disabled}) =>
    <Box width={`${INFO_DIALOG_WIDTH}px`}
         background="beige"
         align="center"
         pad="2rem 1rem 2.25rem"
         margin={{bottom: "15%"}}
         style={{
             position: "absolute",
             transition: " all 0.25s ease",
             opacity: skill ? 1 : 0,
             left: "50%",
             top: "50%",
             transform: "translate(-50%, -50%)",
             borderRadius: "0.5rem",
             zIndex: skill ? 2 : -1
         }}
    >
        <Box width="90%"
             align="center"
             margin={{bottom: "2rem"}}
        >
            {/* Heading */}
            <Heading size="2rem"
                     textAlign="center"
                     margin="0 0 0.5rem"
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

export default InfoDialogPartial;
