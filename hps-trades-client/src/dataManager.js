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
};

export const dataManagerConstants = {
    LOGEED_IN_USER: 'LOGEED_IN_USER'
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
        let userRoles = getObjectByName(myConfig.Master_UserRoles);
        if (userRoles.length == 0) {
            dataInitialiseService.getUserRoles(myConfig.Master_UserRoles)
                .then((responseText) => {
                    return responseText;
                })
                .then((response) => {
                    var obj = {
                        type: myConfig.Master_UserRoles,
                        data: response,
                        valid: getValidDate()
                    };
                    dataManager.setObjectByName(myConfig.Master_UserRoles, obj);
                    //console.log('USR : ', dataManager.getObjectByName(myConfig.Master_UserRoles));
                });
        }
        return userRoles.data;
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

function getValidDate() {
    var currentDateTime = new Date();
    return currentDateTime.setMinutes(currentDateTime.getMinutes() + myConfig.CacheValidateInMinutes);
}
