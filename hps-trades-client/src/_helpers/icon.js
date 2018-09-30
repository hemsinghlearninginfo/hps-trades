import React from 'react';
import { iconConstants } from '../_constants';
import { FaUserSecret, FaSignOutAlt, FaSignInAlt, FaUserAlt, FaGavel } from 'react-icons/fa';

export function getIcon(iconType) {
    let iconsHTML;
    switch (iconType) {
        case iconConstants.SIGN_OUT:
            iconsHTML = <FaSignOutAlt />;
        case iconConstants.SIGN_IN:
            iconsHTML = <FaSignInAlt />;
        case iconConstants.USER_PREFERENCE:
            iconsHTML = <FaUserSecret />;
        case iconConstants.USER_LABEL:
            iconsHTML = <FaUserAlt />;
            case iconConstants.LEGAL:
            iconsHTML = <FaGavel />;
    }
    return iconsHTML;
}
