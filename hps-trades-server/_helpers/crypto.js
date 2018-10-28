const CryptoJS = require("crypto-js");

module.exports = {
    encrypt,
    decrypt
};

function encrypt(data) {
    var cipherText = CryptoJS.AES.encrypt(data, process.env.HPS_TRADES_CRYPTO_KEY).toString(); 
    cipherText = cipherText.replace(/\//g,'hpsslashhps');
    cipherText = cipherText.replace(/&/g,'hpsandhps');
    cipherText = cipherText.replace(/\?/g,'hpsquestionhps');
    return cipherText;
}

function decrypt(ciphertext) {
    cipherText = cipherText.replace(/hpsslashhps/g,'\\');
    cipherText = cipherText.replace(/hpsandhps/g,'\&');
    cipherText = cipherText.replace(/hpsquestionhps/g,'\?');
    let bytes = CryptoJS.AES.decrypt(ciphertext, process.env.HPS_TRADES_CRYPTO_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}
