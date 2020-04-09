import React, {FC} from 'react';
import {Box, Image} from "grommet";

import logoSmall from "../../../assets/logo/logo_small.png";

import ButtonComponent from "../../../components/ButtonComponent";

const MENU_ITEMS: Array<string> = ["Fähigkeiten", "Alchemie"];

interface Props {
}

const MenuPartial: FC<Props> = ({}) => (
    <Box width="200px"
         height="100%"
         background="gold"
         align="center"
    >
        {/* Logo */}
        <Box width="5rem"
             height="5rem"
             align="center"
             justify="center"
             margin="4rem 0"
        >
            <Image src={logoSmall} fit="contain"/>
        </Box>

        {/* Menu Items */}
        <Box width="150px" height="50%">
            {MENU_ITEMS.map((item: string) =>
                <ButtonComponent key={item}
                                 color="white"
                                 background="medium"
                                 hoverColor="dark"
                                 padding="1rem"
                                 fontSize="1.5rem"
                                 margin="0 0 1.5rem"
                >
                    {item}
                </ButtonComponent>)}
        </Box>
    </Box>
);

export default MenuPartial;
