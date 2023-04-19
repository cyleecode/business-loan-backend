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

async function fetchBalance(provider, company) {
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

async function fetchBalance(provider, company) {
  return await thirdPartyService
    .balanceSheetProvider(provider, company)
    .then((v) => {
      return new MResponse(true, v);
    })
    .catch((err) => {
      console.log(err);
      return new MResponse(false);
    });
}

async function requestOutcome({ personalDetails, loan, balanceSheet }) {
  console.log('Personal details: ', personalDetails);
  console.log('Applied loan: ', loan);
  console.log('balance sheet: ', balanceSheet);

  let preAssessment = '20';
  let totalProfitOrLost = 0;
  let yearEstablished = 0;
  let averageAsset = 0;
  let submit = {};

  //personal details
  const { firstname, lastname, phone, address, company } = personalDetails;
  submit.name = firstname + ' ' + lastname;
  submit.company = company;
  submit.phone = phone;
  submit.address = address;

  //rules
  //info in last 12 month
  for (let i = 0; i < 12; i++) {
    const { year, profitOrLost, assetsValue } = balanceSheet[i];
    //get smallest year
    if (yearEstablished < year) yearEstablished = year;
    //sum of totalProfitOrLost and asset
    totalProfitOrLost += profitOrLost;
    averageAsset += assetsValue;
  }

  //if profit greater than zero
  const isProfit = totalProfitOrLost ? true : false;
  //if average asset greater than loan
  const isAssetGreaterLoan = averageAsset / 12 > loan;

  //business details
  submit.year = yearEstablished;
  submit.profitOrLost = totalProfitOrLost;
  submit.preAssessment = isProfit ? '60' : preAssessment;
  submit.preAssessment = isAssetGreaterLoan ? '100' : submit.preAssessment;

  return await thirdPartyService
    .decisionEngine(submit)
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
