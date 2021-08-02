const CryptoJS = require('crypto-js');

/**
 * encrypt text in AES
 * @param {string} text - text will be encrypt
 * @param {string} secret - secret
 * @returns {string} cipher text
 */
function encrypt(text, secret) {
  return CryptoJS.AES.encrypt(text, secret).toString();
}

/**
 * decrypt AES cipher text in original text
 * @param {string} cipherText - cipher text
 * @param {string} secret - secret
 * @returns {string} original text
 */
function decrypt(cipherText, secret) {
  const bytes = CryptoJS.AES.decrypt(cipherText, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  encrypt,
  decrypt,
};
