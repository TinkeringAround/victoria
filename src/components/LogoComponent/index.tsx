import React, {FC} from 'react';
import {Image, ImageProps} from "grommet";

import logo from "../../assets/logo/logo.png";

interface Props extends ImageProps {
}

const LogoComponent: FC<Props> = (props: Props) => <Image {...props} src={logo} fit="contain"/>;

export default LogoComponent;
