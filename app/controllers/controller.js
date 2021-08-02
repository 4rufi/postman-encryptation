async function controller(req, res, next) {
  const returnData = {
    code: 1200,
    body: {
      data: JSON.parse(req.userData),
      encryptedData: req.body.userData,
    },
  };
  if (req.sessionKey) {
    returnData.headers = {
      sessionKey: JSON.parse(req.sessionKey),
      encryptedSessionKey: req.headers['session-key'],
    };
  }
  res.status(200).json(returnData);
}

module.exports = controller;
