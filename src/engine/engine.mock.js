const { MResponse } = require('../model/MResponse');

function decisionEngine() {
  return fityfity() ? new MResponse(true, true) : new MResponse(true, false);
}

module.exports = {
  decisionEngine,
};

function fityfity() {
  return Math.random() < 0.5;
}
