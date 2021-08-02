const express = require('express');
const controller = require('../controllers');
const {
  decryptAesCbc,
  decryptAesEcb,
  rsaWithAesCbc,
  rsa,
} = require('../middleware');

function Router() {
  const router = express.Router();

  router.get('/aescbc', [decryptAesCbc, controller]);
  router.get('/aesecb', [decryptAesEcb, controller]);
  router.get('/rsa-aes', [rsaWithAesCbc, controller]);
  router.get('/rsa', [rsa, controller]);

  return router;
}

module.exports = Router();
