import { utils } from './'

export const dataManager = {
    getCurrentUser,
    setCurrentUser,
    logoutUser,
};

export const dataManagerConstants = {
    LOGEED_IN_USER: 'LOGEED_IN_USER'
}

function getCurrentUser() {
    if (localStorage[dataManagerConstants.LOGEED_IN_USER] !== undefined) {
        let user = utils.decrypt(localStorage[dataManagerConstants.LOGEED_IN_USER]);
        return JSON.parse(user);
    }
    return [];
}

function setCurrentUser(user) {
    user = utils.encrypt(JSON.stringify(user));
    localStorage.setItem(dataManagerConstants.LOGEED_IN_USER, user);
}

function logoutUser() {
    localStorage.removeItem(dataManagerConstants.LOGEED_IN_USER);
}
