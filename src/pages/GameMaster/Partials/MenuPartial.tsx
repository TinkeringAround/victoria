import React, {FC} from 'react';
import {Box, Image} from "grommet";

import ButtonComponent from "../../../components/ButtonComponent";

import logoSmall from "../../../assets/logo/logo_small.png"

const MENU_ITEMS: Array<string> = ["Fähigkeiten", "Alchemie"];

interface Props {
    delay: number
}

const MenuPartial: FC<Props> = ({delay}) => (
    <Box width="200px"
         height="95%"
         background="gold"
         align="center"
         animation={{type: "slideDown", size: "large", delay: delay}}
         style={{
             position: "absolute",
             left: "25px",
             clipPath: "polygon(100% 0, 100% 100%, 50% 95%, 0 100%, 0 0)"
         }}
    >
        {/* Logo */}
        <Box width="6rem"
             height="6rem"
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
