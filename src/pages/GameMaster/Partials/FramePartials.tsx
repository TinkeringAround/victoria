import React, {FC, Fragment} from 'react';

interface Props {
    visible: boolean
}

// TODO: Continue
const FramePartials: FC<Props> = ({visible = false}) => {
    return (
        <Fragment>
            {/*/!* Left Frame *!/*/}
            {/*{visible &&*/}
            {/*<Box width="50px"*/}
            {/*     height="100%"*/}
            {/*     style={{*/}
            {/*         position: "absolute",*/}
            {/*         top: 0,*/}
            {/*         left: 0,*/}
            {/*         backgroundImage: woodTexture,*/}
            {/*         zIndex: 5*/}
            {/*     }}*/}
            {/*/>}*/}
        </Fragment>
    );
};

export default FramePartials;
