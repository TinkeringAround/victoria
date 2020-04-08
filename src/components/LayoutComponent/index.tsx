import React, {FC} from 'react'
import {Box} from 'grommet'

// ===============================================
const LayoutComponent: FC = ({children}) => (
    <Box
        background="white"
        width={window.innerWidth + 'px'}
        height={window.innerHeight + 'px'}
        margin="0"
        style={{position: 'relative'}}
    >
        {children}
    </Box>
);

export default LayoutComponent
