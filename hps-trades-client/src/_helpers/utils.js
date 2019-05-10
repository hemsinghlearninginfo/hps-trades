import CryptoJS from 'crypto-js';
import { myConfig } from '../config';

export const utils = {
    getQueryString,
    encrypt,
    decrypt,
    validateEmail,
    validatePassword,
    scrollToTop
};

function getQueryString(props, queryStringName){
    let result = '';
    const hash = (props.location.hash).toString().replace('#/', '');
    if (hash !== '') {
        var urlParams = new URLSearchParams(hash);
        if (urlParams.has(queryStringName)) {
            result = urlParams.get(queryStringName);
        }
    }
    return result;
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


function validateEmail(value) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
}

function validatePassword(value) {
    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(value);
}


function scrollToTop(){
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
}