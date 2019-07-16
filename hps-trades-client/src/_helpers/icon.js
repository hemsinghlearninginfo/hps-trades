import React from 'react';
import { iconConstants } from '../_constants';
import {
    FaUserSecret, FaSignOutAlt, FaSignInAlt, FaUserAlt, FaGavel, FaCog, FaAngrycreative, FaCalendar,
    FaPencilAlt, FaTrashAlt, FaPlusSquare, FaSave, FaBan, FaExclamationCircle, FaTimesCircle,
    FaUserFriends, FaAtom, FaUsersCog, FaChartLine, FaBook, FaWindowMaximize, FaWindowRestore, FaQuestion
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
        case iconConstants.EVENT:
            iconsHTML = <FaCalendar />;
            break;
        case iconConstants.EDIT:
            iconsHTML = <FaPencilAlt />;
            break;
        case iconConstants.DELETE:
            iconsHTML = <FaTrashAlt />;
            break;
        case iconConstants.ADD:
            iconsHTML = <FaPlusSquare />;
            break;
        case iconConstants.SAVE:
            iconsHTML = <FaSave />;
            break;
        case iconConstants.CANCEL:
            iconsHTML = <FaBan />;
            break;
        case iconConstants.ERROR:
            iconsHTML = <FaExclamationCircle />;
            break;
        case iconConstants.CLOSE:
            iconsHTML = <FaTimesCircle />;
            break;
        case iconConstants.USER_MAPPING:
            iconsHTML = <FaUserFriends />;
            break;
        case iconConstants.USERS_STATUS:
            iconsHTML = <FaUsersCog />;
            break;
        case iconConstants.STOCK:
            iconsHTML = <FaAtom />;
            break;
        case iconConstants.PAPERTRADE:
            iconsHTML = <FaBook />;
            break;
        case iconConstants.WINDOWMAXIMIZE:
            iconsHTML = <FaWindowMaximize />;
            break;
        case iconConstants.WINDOWRESTORE:
            iconsHTML = <FaWindowRestore />;
            break;
        case iconConstants.QUESTION:
            iconsHTML = <FaQuestion />;
            break;
        default:
            iconsHTML = <FaAngrycreative />
    }
    return iconsHTML;
}
