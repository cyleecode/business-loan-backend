const { MResponse } = require('../model/MResponse');

function getBalance() {
  return new MResponse(true, randomBalanceSheet());
}

module.exports = {
  getBalance,
};

function randomBalanceSheet() {
  const sheet = [];
  const year = 2000 + Math.floor(Math.random() * 23);
  const month = 12 + Math.floor(Math.random() * 12);
  for (let i = month; i > 0; i--) {
    let cyear = year;
    let cmonth = i;
    if (i > 12) {
      cmonth -= 12;
      cyear += 1;
    }

    sheet.push({
      year: cyear,
      month: cmonth,
      profitOrLoss: getRandomNumberInRange(-10000, 10000),
      assetsValue: getRandomNumberInRange(0, 10000),
    });
  }
  return sheet;
}

function getRandomNumberInRange(min, max) {
  // Ensure min and max are numbers
  min = Number(min);
  max = Number(max);

  // Swap min and max if min is greater than max
  if (min > max) {
    [min, max] = [max, min];
  }

  // Generate a random number between min and max, inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
