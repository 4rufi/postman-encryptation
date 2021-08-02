const {
  decryptInputsAesCbc,
  encryptAesCbc,
  decryptAesCbc,
  generateRamdomSecret,
} = require('./aesCbc');
const { decryptRSAPrivateKey, encryptRSAPublicKey } = require('./rsa');
const { encodeJsonBase64, decodeJsonBase64 } = require('./base64');
const { encrypt: encryptAes, decrypt: decryptAes } = require('./aes');
const { encryptSha256, encryptSha512 } = require('./sha');

module.exports = Object.freeze({
  decryptAesCbc,
  encryptAesCbc,
  decryptInputsAesCbc,
  decryptRSAPrivateKey,
  encryptRSAPublicKey,
  generateRamdomSecret,
  encodeJsonBase64,
  decodeJsonBase64,
  encryptAes,
  decryptAes,
  encryptSha256,
  encryptSha512,
});
