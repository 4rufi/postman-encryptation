const { decryptRSAPrivateKey } = require('../utils/cipher');

const MODULE = 'rsa';
function rsa(req, res, next) {
  const rsaKey = process.env.PRIVATE_RSA_KEY;
  try {
    const dataDecrypt = decryptRSAPrivateKey(req.body.userData, rsaKey);

    if (!dataDecrypt)
      return res.status(422).json({ code: 3001, message: 'error in service' });

    req.userData = dataDecrypt;
    return next();
  } catch (error) {
    return res
      .status(500)
      .json({ code: 1010, module: MODULE, message: 'Error decrypt' });
  }
}

module.exports = rsa;
