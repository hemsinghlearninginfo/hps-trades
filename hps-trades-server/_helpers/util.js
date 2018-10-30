const CryptoJS = require("crypto-js");

module.exports = {
    encrypt,
    decrypt,
    getQueryStringValue
};


function encrypt(plainText) {
    let b64 = CryptoJS.AES.encrypt(plainText, process.env.HPS_TRADES_CRYPTO_KEY).toString();
    let e64 = CryptoJS.enc.Base64.parse(b64);
    let eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
}

function decrypt(cipherText) {
    let reb64 = CryptoJS.enc.Hex.parse(cipherText);
    let bytes = reb64.toString(CryptoJS.enc.Base64);
    let decrypt = CryptoJS.AES.decrypt(bytes, process.env.HPS_TRADES_CRYPTO_KEY);
    let plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
}

function getQueryStringValue(queryString, valueFor) {
    //let splitQueryString = queryString.toString().split('&');

    let queryparams = queryString.split('?')[1];
    queryparams = queryparams === undefined ? queryString : queryparams;
    let params = queryparams.split('&');
    let pair = null;
    let data = [];

    params.forEach(function (d) {
        pair = d.split('=');
        data.push({ key: pair[0], value: pair[1] });
    });

    return (data.filter(function (el) {
        return (el.key === valueFor);
    }).map(function (el) {
        return el.value;
    }))[0];
}
