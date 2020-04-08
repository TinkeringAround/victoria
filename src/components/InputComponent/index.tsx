import React, {FC} from 'react'
import styled from 'styled-components'

import {colors} from "../../styles/theme";
import {Box, Text} from "grommet";

// ==========================================================
const SInput = styled.input`
    box-sizing: border-box;

  width: 100%;
  padding: 1rem;
  
  font-family: Roboto;
  font-weight: bold;
  font-size: 1.25rem;
  text-overflow: ellipsis;
  
  color: ${colors['dark']};
  
  border: none;
  border-radius: 10px;
  
  background-color: ${colors["light"]};
  
  ::placeholder {
    color: ${colors["medium"]};
  }
  
  :focus {
    outline: none;
  }
`;

// ==========================================================
interface Props {
    value: string
    setValue: (value: string) => void

    placeholder?: string
    type?: string
    label?: string
    pattern?: string

    margin?: string
}

// ==========================================================
const InputComponent: FC<Props> = ({value, setValue, placeholder = '', type = '', label = "", pattern = "", margin = ""}) => (
    <Box width="100%">
        {label !== "" &&
        <Text
            size="2.5rem"
            margin={margin === "" ? "0 0 0.25rem" : margin}>
            {label}
        </Text>}
        <SInput
            name={type}
            type={type}
            value={value}
            onChange={event => setValue(event.target.value)}
            placeholder={placeholder}
            pattern={pattern}
        />
    </Box>
);

export default InputComponent;
