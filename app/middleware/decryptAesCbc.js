const { decryptAesCbc } = require('../utils/cipher');

const MODULE = 'aesCbc';
function aesCbc(req, res, next) {
  const aes_key = req.headers['aes_key'];
  const aes_vector = req.headers['aes_vector'];

  try {
    const dataDecrypt = decryptAesCbc(req.body.userData, aes_key, aes_vector);

    if (!dataDecrypt)
      return res.status(422).json({ code: 1001, message: 'error in service' });

    req.userData = dataDecrypt;
    return next();
  } catch (error) {
    return res
      .status(500)
      .json({ code: 1010, module: MODULE, message: 'Error decrypt' });
  }
}

module.exports = aesCbc;
