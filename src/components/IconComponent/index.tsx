import React, {FC} from 'react';

import {TIconType} from '../../types/TIconType';

interface Props {
    type: TIconType
}

const IconComponent: FC<Props> = ({type}) => <span className={"icon-" + type}></span>

export default IconComponent;
