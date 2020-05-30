import React, {FC} from 'react';
import {Box, Heading} from "grommet";
import styled from "styled-components";

import {TItemType} from "../../../../../types/TItem";

import {colors} from "../../../../../styles/theme";

import {changeColorBrightness} from "../../../../../services/ColorService";
import {TWeaponType} from "../../../../../types/TWeapon";

const SHeading = styled(Heading)<{ active: boolean }>`
    padding: 1rem;
    margin: 0 1.5rem 0 0;
    
    font-size: 1.5rem;
    line-height: 1.5rem;
    
    border-radius: 0.25rem;   
    background: ${({active}) => active ? colors.beige : "transparent"};
   
    transition: all 0.2s ease;
    cursor: pointer;
    
    :hover {
        background: ${changeColorBrightness(colors.beige, -20)};
    }
`

const TABS: Array<TItemType | TWeaponType> = ["material", "consumable", "weapon", "shield"];
const TAB_NAMES: { [name: string]: string } = {
    "material": "Materialien",
    "consumable": "Verzehrbares",
    "weapon": "Waffen",
    "shield": "Schilde"
}

interface Props {
    filter: TItemType | TWeaponType
    setFilter: (filter: TItemType | TWeaponType) => void
}

const HeadingPartial: FC<Props> = ({filter, setFilter}) =>
    <Box direction="row"
         align="center"
         margin={{bottom: "2rem"}}
         style={{
             color: colors.dark,
             textAlign: "center"
         }}
    >
        {TABS.map((tab) =>
            <SHeading key={"Tab-" + tab}
                      active={filter === tab}
                      onClick={() => setFilter(tab)}
            >
                {TAB_NAMES[tab]}
            </SHeading>)}
    </Box>

export default HeadingPartial;
