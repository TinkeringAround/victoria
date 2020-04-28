import React, {FC} from 'react';
import {Button, ButtonType} from "grommet";
import styled from "styled-components";

import {TColor} from "../../types/TColor";

import {colors} from "../../styles/theme";

const SButton = styled(Button)`
    box-sizing: border-box;
    
    width: 100%;
    max-width: 250px;

    font-weight: bold;
    text-align: center;
    
    border-radius: 10px;

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

const ButtonComponent: FC<Props> = ({children, onClick, color, background, hoverColor, margin, padding = "1.5rem 1rem", fontSize = "2.5rem", disabled = false}) =>
    <SButton
        disabled={disabled}
        color={color}
        onClick={onClick}
        focusIndicator={false}
        margin={margin}
        style={{
            fontSize: fontSize,
            padding: padding,
            // @ts-ignore
            background: colors.hasOwnProperty(background) ? colors[background] : background,
            // @ts-ignore
            boxShadow: "0 5px 0 " + (colors.hasOwnProperty(hoverColor) ? colors[hoverColor] : hoverColor)
        }}>
        {children}
    </SButton>;

export default ButtonComponent;
