import React, {FC} from 'react';
import {Box, Image} from "grommet";

import {TMenuMode} from "../../../types/TMenuMode";

import ButtonComponent from "../../../components/ButtonComponent";

import logoSmall from "../../../assets/logo/logo_small.png"

export const MENU_ITEMS: Array<TMenuMode> = ["Fähigkeiten", "Alchemie"];

interface Props {
    delay: number
    setMenuMode: (newMenuMode: TMenuMode) => void
}

const NavigationBarPartial: FC<Props> = ({delay, setMenuMode}) => (
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
             margin="6rem 0"
        >
            <Image src={logoSmall} fit="contain"/>
        </Box>


        {/* Navigation Bar Items */}
        <Box width="150px" height="50%">
            {MENU_ITEMS.map((item: TMenuMode) =>
                <ButtonComponent key={"" + item}
                                 color="white"
                                 background="medium"
                                 hoverColor="dark"
                                 padding="1rem"
                                 fontSize="1.5rem"
                                 margin="0 0 2rem"
                                 onClick={() => setMenuMode(item)}
                >
                    {item}
                </ButtonComponent>)}
        </Box>
    </Box>
);
export default NavigationBarPartial;
