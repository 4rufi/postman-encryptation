const { decryptAesCbc, decryptRSAPrivateKey } = require('../utils/cipher');

const MODULE = 'rsaWithAesCbc';
function rsaWithAesCbc(req, res, next) {
  const rsaKey = process.env.PRIVATE_RSA_KEY;
  try {
    req.sessionKey = decryptRSAPrivateKey(req.headers['session-key'], rsaKey);
  } catch (error) {
    return res
      .status(500)
      .json({ code: 4010, module: MODULE, message: 'RSA Incorrect' });
  }

  try {
    const session = JSON.parse(req.sessionKey);
    const dataDecrypt = decryptAesCbc(
      req.body.userData,
      session.AESKey,
      session.AESVector
    );

    if (!dataDecrypt)
      return res.status(422).json({ code: 4001, message: 'error in service' });

    req.userData = dataDecrypt;
  } catch (error) {
    return res
      .status(500)
      .json({ code: 1010, module: MODULE, message: 'Error decrypt' });
  }

  return next();
}

module.exports = rsaWithAesCbc;
