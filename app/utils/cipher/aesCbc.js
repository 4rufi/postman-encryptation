// const { CommonCipher } = require('fif-common-cipher');
const CryptoJS = require('crypto-js');
const { v4: uuid } = require('uuid');

function decrypt(encrypted, key, vector) {
  const cipher = CryptoJS.AES.decrypt(encrypted, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(vector),
    mode: CryptoJS.mode.CBC,
  });
  return CryptoJS.enc.Utf8.stringify(cipher).toString();
}

function decryptInputsAesCbc(inputs, session) {
  if (typeof inputs !== 'object') {
    throw new TypeError('inputs must be object');
  }
  if (typeof session !== 'object') {
    throw new TypeError('sessionKey must be object');
  }
  const sessionKey = session.key;
  const sessionVector = session.vector;

  const result = {};
  const keys = Object.keys(inputs);
  keys.forEach((key) => {
    result[`${key}`] = decrypt(inputs[`${key}`], sessionKey, sessionVector);
    if (!result[`${key}`]) {
      throw new Error(`Fallo al descifrar ${key}`);
    }
  });
  return result;
}
const encryptAesCbc = (data, key, iv) => {
  if (typeof data !== 'string') {
    throw new TypeError('data must be string');
  }
  if (typeof key !== 'string') {
    throw new TypeError('key must be string');
  }
  if (typeof iv !== 'string') {
    throw new TypeError('iv must be string');
  }

  const keyParse = CryptoJS.enc.Utf8.parse(key);
  const ivParse = CryptoJS.enc.Utf8.parse(iv);
  return CryptoJS.AES.encrypt(data, keyParse, {
    iv: ivParse, // parse the IV
    mode: CryptoJS.mode.CBC,
  }).toString();
};

const decryptAesCbc = (data, key, iv) => {
  if (typeof data !== 'string') {
    throw new TypeError('data must be string');
  }
  if (typeof key !== 'string') {
    throw new TypeError('key must be string');
  }
  if (typeof iv !== 'string') {
    throw new TypeError('iv must be string');
  }
  const rawData = CryptoJS.enc.Base64.parse(data);
  const keyParse = CryptoJS.enc.Utf8.parse(key);
  const ivParse = CryptoJS.enc.Utf8.parse(iv);
  const decrypterData = CryptoJS.AES.decrypt(
    { ciphertext: rawData },
    keyParse,
    {
      iv: ivParse,
      mode: CryptoJS.mode.CBC,
    },
  );
  return decrypterData.toString(CryptoJS.enc.Utf8);
};

const generateRamdomSecret = () => {
  return {
    key: uuid().toString().replace(/-/g, ''),
    iv: uuid().toString().replace(/-/g, '').substr(0, 16),
  };
};

module.exports = {
  decryptInputsAesCbc,
  encryptAesCbc,
  decryptAesCbc,
  generateRamdomSecret,
};
