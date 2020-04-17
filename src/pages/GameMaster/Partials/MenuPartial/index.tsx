import React, {FC} from 'react';
import {Box} from "grommet";
import posed, {PoseGroup} from "react-pose";

const AMenu = posed(Box)({
    exit: {
        top: "-95%",
        transition: {
            ease: "easeInOut",
            duration: 2000
        }
    },
    enter: {
        top: 0,
        transition: {
            ease: "easeInOut",
            duration: 2000
        }
    }
})


interface Props {
    menuIsOpen: boolean
    closeMenu: () => void
}

const MenuPartial: FC<Props> = ({menuIsOpen, closeMenu}) => {
    return (
        <PoseGroup flipMove={false}>
            {/* Content */}
            {menuIsOpen && <AMenu
                key="MenuPartial"
                width="100%"
                height="95%"
                background="light"
                onClick={closeMenu}
                style={{
                    position: "absolute",
                    left: 0,
                    zIndex: 9
                }}
            >
                {menuIsOpen}
            </AMenu>}

        </PoseGroup>
    );
};

export default MenuPartial;
