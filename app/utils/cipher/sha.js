const sha256 = require('crypto-js/sha256');
const sha512 = require('crypto-js/sha512');

function encryptSha256(data) {
  const hashDigest = sha256(data);
  return hashDigest.toString();
}

function encryptSha512(data) {
  const hashDigest = sha512(data);
  return hashDigest.toString();
}

module.exports = {
  encryptSha256,
  encryptSha512,
};
