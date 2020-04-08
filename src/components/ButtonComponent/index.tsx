import React, {FC} from 'react';
import {Button, ButtonType} from "grommet";
import styled from "styled-components";

import {TColor} from "../../types/TColor";
import {colors} from "../../styles/theme";

const SButton = styled(Button)`
    box-sizing: border-box;
    
    width: 100%;
    max-width: 250px;
    padding: 1.5rem 1rem;

    font-size: 2.5rem;
    font-weight: bold;
    
    background: lightblue;
    color: white;
    
    text-align: center;
    
    border-radius: 10px;

    :active {
        box-shadow: 0px 0px 0px #fff; 
        transform: translateY(4px);
    }
`;

interface Props extends ButtonType {
    color: TColor,
    background: TColor,
    hoverColor: TColor;
}

const ButtonComponent: FC<Props> = ({children, onClick, color, background, hoverColor, margin, disabled}) =>
    <SButton
        disabled={disabled}
        color={color}
        onClick={onClick} focusIndicator={false}
        margin={margin}
        style={{
            background: colors[background],
            boxShadow: "0 5px 0 " + colors[hoverColor]
        }}>
        {children}
    </SButton>;

export default ButtonComponent;
