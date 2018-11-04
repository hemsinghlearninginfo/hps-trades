import CryptoJS from 'crypto-js';
import { myConfig } from './config';

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

function encrypt(plainText){
    let b64 = CryptoJS.AES.encrypt(plainText, myConfig.DataClientSideStore).toString();
    let e64 = CryptoJS.enc.Base64.parse(b64);
    let eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
}

function decrypt(cipherText){
    let reb64 = CryptoJS.enc.Hex.parse(cipherText);
    let bytes = reb64.toString(CryptoJS.enc.Base64);
    let decrypt = CryptoJS.AES.decrypt(bytes, myConfig.DataClientSideStore);
    let plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
}
