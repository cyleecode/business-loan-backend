const { MResponse } = require('../model/MResponse');

module.exports = {
  setAppId,
  getAppId,
};

const db = {};

async function setAppId() {
  let appid;
  while (!appid) {
    const newid = generateRandomString(8);
    if (!db[newid]) {
      db[newid] = new Date();
      appid = newid;
    }
  }
  return new MResponse(true, appid);
}

async function getAppId({ appid }) {
  const result = db[appid];
  if (result) {
    return new MResponse(true, result);
  } else {
    return new MResponse(false, null);
  }
}

//
function generateRandomString(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
}
