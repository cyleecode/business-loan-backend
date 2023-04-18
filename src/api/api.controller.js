const express = require('express');
const router = express.Router();
const apiService = require('./api.service');

router.get('/application', appId);
router.get('/balance', balanceSheet);
router.post('/decision', requestOutcome);

module.exports = router;

function balanceSheet(req, res, next) {}
function requestOutcome(req, res, next) {}

function appId(req, res, next) {
  const appid = req.query?.appid;
  if (appid) {
    apiService
      .getAppId({ appid })
      .then((v) => {
        res.status(200).json(v);
      })
      .catch((err) => next(err));
  } else {
    apiService
      .setAppId()
      .then((v) => {
        res.status(200).json(v);
      })
      .catch((err) => next(err));
  }
}
