const { MResponse } = require('../model/MResponse');
const thirdPartyService = require('./api.thirdparty');

module.exports = {
  setAppId,
  getAppId,
  fetchBalance,
  requestOutcome,
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

async function fetchBalance() {
  return await thirdPartyService
    .balanceSheetProvider()
    .then((v) => {
      if (v.status) {
        return new MResponse(true, v.data);
      } else {
        return new MResponse(false);
      }
    })
    .catch((err) => {
      console.log(err);
      return new MResponse(false);
    });
}

async function requestOutcome({ name, year, profitOrLost, preAssessment }) {
  return await thirdPartyService
    .decisionEngine({ name, year, profitOrLost, preAssessment })
    .then((v) => {
      if (v.status) {
        return new MResponse(true, v.data);
      } else {
        return new MResponse(false);
      }
    })
    .catch((err) => {
      console.log(err);
      return new MResponse(false);
    });
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
