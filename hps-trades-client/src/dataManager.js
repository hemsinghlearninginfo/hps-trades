import CryptoJS from 'crypto-js';
import { myConfig } from './config';
import { dataInitialiseService } from './_services';

export const dataManager = {
    getCurrentUser,
    setCurrentUser,
    logoutUser,
    getUserRole,
    getObjectByName,
    setObjectByName,
    getUserAlerts,
};

export const dataManagerConstants = {
    LOGEED_IN_USER: 'LOGEED_IN_USER',
    LOGEED_IN_ALERT: 'LOGEED_IN_ALERT',
    TRADDING_TYPE_PAPER : 'PAPER_TRADDING_TYPE',
    TRADDING_TYPE_LIVE : 'LIVE_TRADDING_TYPE'
}

function getUserAlerts(alertData) {
    let userAlerts = [];
    if (localStorage[dataManagerConstants.LOGEED_IN_ALERT] !== undefined) {
        userAlerts = JSON.parse(decrypt(localStorage[dataManagerConstants.LOGEED_IN_ALERT]));
    }

    if (userAlerts.length > 0) {
        userAlerts.forEach(function (v) {
            let searchItem = alertData.filter(function (f) {
                return f.id === v.id;
            });
            if (searchItem.length === 0) {
                alertData.push(v);
            }
        });
    }

    let encryptAlertData = encrypt(JSON.stringify(alertData));
    localStorage.removeItem(dataManagerConstants.LOGEED_IN_ALERT);
    localStorage.setItem(dataManagerConstants.LOGEED_IN_ALERT, encryptAlertData);

    return alertData;
}

function getCurrentUser() {
    if (localStorage[dataManagerConstants.LOGEED_IN_USER] !== undefined) {
        let user = decrypt(localStorage[dataManagerConstants.LOGEED_IN_USER]);
        return JSON.parse(user);
    }
    return [];
}

function setCurrentUser(user) {
    user = encrypt(JSON.stringify(user));
    localStorage.setItem(dataManagerConstants.LOGEED_IN_USER, user);
}

function logoutUser() {
    localStorage.removeItem(dataManagerConstants.LOGEED_IN_USER);
}

function getUserRole() {
    try {
        return dataInitialiseService.getMasterData(myConfig.Master_UserRoles);
        // let userRoles = getObjectByName(myConfig.Master_UserRoles);
        // if (userRoles.length === 0) {

        //     const response = await dataInitialiseService.getMasterData(myConfig.Master_UserRoles);
        //     var obj = await {
        //         type: myConfig.Master_UserRoles,
        //         data: response.JSON(),
        //         valid: getValidDate()
        //     };
        //     dataManager.setObjectByName(myConfig.Master_UserRoles, obj);
        //     return getObjectByName(myConfig.Master_UserRoles).data;
        //     // dataInitialiseService.getMasterData(myConfig.Master_UserRoles)
        //     //     .then((response) => {
        //     //         var obj = {
        //     //             type: myConfig.Master_UserRoles,
        //     //             data: response,
        //     //             valid: getValidDate()
        //     //         };
        //     //         dataManager.setObjectByName(myConfig.Master_UserRoles, obj);
        //     //     });
        //     // return await getObjectByName(myConfig.Master_UserRoles).data;
        // }
        // return await userRoles.data;
    }
    catch (error) {
        return error;
    }
}

function getObjectByName(objName) {
    if (localStorage[objName] !== undefined) {
        let data = decrypt(localStorage[objName]);
        if (data.valid !== null) {
            if (data.valid >= (new Date())) {
                return JSON.parse(data);
            }
            else {
                return [];
            }
        }
    }
    return [];
}

function setObjectByName(objName, data) {
    data = encrypt(JSON.stringify(data));
    localStorage.setItem(objName, data);
}

function encrypt(plainText) {
    let b64 = CryptoJS.AES.encrypt(plainText, myConfig.DataClientSideStore).toString();
    let e64 = CryptoJS.enc.Base64.parse(b64);
    let eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
}

function decrypt(cipherText) {
    let reb64 = CryptoJS.enc.Hex.parse(cipherText);
    let bytes = reb64.toString(CryptoJS.enc.Base64);
    let decrypt = CryptoJS.AES.decrypt(bytes, myConfig.DataClientSideStore);
    let plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
}

// function getValidDate() {
//     var currentDateTime = new Date();
//     return currentDateTime.setMinutes(currentDateTime.getMinutes() + myConfig.CacheValidateInMinutes);
// }
