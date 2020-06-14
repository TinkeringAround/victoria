import React, {FC, useContext} from 'react';
import {Button, ButtonType} from "grommet";
import styled from "styled-components";

import {TColor} from "../../types/TColor";

import {colors} from "../../styles/theme";

import SoundContext from "../../contexts/SoundContext";

import {changeColorBrightness} from "../../services/ColorService";

const SButton = styled(Button)<{ backgroundColor: string, disabled: boolean }>`
    box-sizing: border-box;
    
    width: 100%;
    max-width: 250px;

    background: ${({backgroundColor}) => backgroundColor};

    font-weight: bold;
    text-align: center;
    
    border-radius: 10px;
    
    transition: background 0.25s ease;
    
    :hover {
        background: ${({backgroundColor, disabled}) => disabled ? backgroundColor : changeColorBrightness(backgroundColor, 15)};
    }

    :active {
        box-shadow: 0px 0px 0px rgba(0,0,0,0) !important; 
        transform: translateY(4px);
    }
`;

interface Props extends ButtonType {
    color: TColor | string,
    background: TColor | string,
    hoverColor: TColor | string;

    padding?: string
    fontSize?: string
}

const ButtonComponent: FC<Props> = ({children, onClick, color, background, hoverColor, margin, padding = "1.5rem 1rem", fontSize = "2.5rem", disabled = false}) => {
    const {playEffect} = useContext(SoundContext);

    return (
        <SButton
            disabled={disabled}
            color={color}
            // @ts-ignore
            backgroundColor={colors.hasOwnProperty(background) ? colors[background] : background}
            onClick={(event) => {
                playEffect("button");
                if (onClick) onClick(event);
            }}
            focusIndicator={false}
            margin={margin}
            style={{
                fontSize: fontSize,
                padding: padding,
                // @ts-ignore
                boxShadow: "0 5px 0 " + (colors.hasOwnProperty(hoverColor) ? colors[hoverColor] : hoverColor)
            }}
        >
            {children}
        </SButton>
    )
};

export default ButtonComponent;
