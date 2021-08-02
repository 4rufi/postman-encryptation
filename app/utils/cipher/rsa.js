const {
  privateDecrypt,
  publicEncrypt,
  constants,
} = require('crypto-browserify');

const encryptRSAPublicKey = (toEncrypt, rsaPublicKey) => {
  if (!rsaPublicKey) {
    throw new TypeError('public key is not defined');
  }
  const publicKey = {
    key: rsaPublicKey,
    padding: constants.RSA_PKCS1_PADDING,
  };
  const buffer = Buffer.from(toEncrypt, 'utf8');
  const encrypted = publicEncrypt(publicKey, buffer);
  return encrypted.toString('base64');
};

const decryptRSAPrivateKey = (toDecrypt, rsaPrivateKey) => {
  if (!rsaPrivateKey) {
    throw new TypeError('private key is not defined');
  }
  const privateKey = {
    key: rsaPrivateKey,
    padding: constants.RSA_PKCS1_PADDING,
  };
  const buffer = Buffer.from(toDecrypt, 'base64');
  const decrypted = privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
};

module.exports = {
  encryptRSAPublicKey,
  decryptRSAPrivateKey,
};
