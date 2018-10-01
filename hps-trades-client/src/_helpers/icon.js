import React from 'react';
import { iconConstants } from '../_constants';
import {
    FaUserSecret, FaSignOutAlt, FaSignInAlt, FaUserAlt, FaGavel, FaCog, FaAngrycreative
}
    from 'react-icons/fa';

export function getIcon(iconType) {
    let iconsHTML;
    switch (iconType) {
        case iconConstants.SIGN_OUT:
            iconsHTML = <FaSignOutAlt />;
            break;
        case iconConstants.SIGN_IN:
            iconsHTML = <FaSignInAlt />;
            break;
        case iconConstants.USER_PREFERENCE:
            iconsHTML = <FaUserSecret />;
            break;
        case iconConstants.USER_LABEL:
            iconsHTML = <FaUserAlt />;
            break;
        case iconConstants.LEGAL:
            iconsHTML = <FaGavel />;
            break;
        case iconConstants.MACHINE:
            iconsHTML = <FaCog />;
            break;
        default:
            iconsHTML = <FaAngrycreative />
    }
    return iconsHTML;
}
