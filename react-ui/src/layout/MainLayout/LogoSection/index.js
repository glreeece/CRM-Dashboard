import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Typography, ButtonBase } from '@material-ui/core';

// project imports
import config from './../../../config';
import Logo from './../../../ui-component/Logo';

//-----------------------|| MAIN LOGO ||-----------------------//

const LogoSection = () => {
    return (
        <ButtonBase disableRipple component={Link} to={config.defaultPath}>
            {/* <Logo /> */}
            <Typography fontFamily="fantasy" fontSize="1.9rem" fontWeight="bold">NexaSalesAI</Typography>
        </ButtonBase>
    );
};

export default LogoSection;
