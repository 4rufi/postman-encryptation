const { decryptAes } = require('../utils/cipher');

const MODULE = 'aesEcb';
function aesEcb(req, res, next) {
  const aes_key = req.headers['aes_key'];

  try {
    const dataDecrypt = decryptAes(req.body.userData, aes_key);

    if (!dataDecrypt)
      return res.status(422).json({ code: 2001, message: 'error in service' });

    req.userData = dataDecrypt;
    return next();
  } catch (error) {
    return res
      .status(500)
      .json({ code: 1010, module: MODULE, message: 'Error decrypt' });
  }
}

module.exports = aesEcb;
