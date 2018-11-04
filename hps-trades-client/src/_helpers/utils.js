import CryptoJS from 'crypto-js';

export const utils = {
    getQueryString,
    encrypt,
    decrypt,
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
    let b64 = CryptoJS.AES.encrypt(plainText, process.env.HPS_TRADES_CRYPTO_KEY).toString();
    let e64 = CryptoJS.enc.Base64.parse(b64);
    let eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
}

function decrypt(cipherText){
    let reb64 = CryptoJS.enc.Hex.parse(cipherText);
    let bytes = reb64.toString(CryptoJS.enc.Base64);
    let decrypt = CryptoJS.AES.decrypt(bytes, process.env.HPS_TRADES_CRYPTO_KEY);
    let plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
}


