function decodeJsonBase64(data) {

  const bufferObj = Buffer.from(data, 'base64');
  const decodedString = bufferObj.toString();
  return JSON.parse(decodedString);

}

function encodeJsonBase64(data) {
  const dataEncoded = JSON.stringify(data);
  return Buffer.from(dataEncoded).toString('base64');

}

module.exports = {
  encodeJsonBase64,
  decodeJsonBase64
}
