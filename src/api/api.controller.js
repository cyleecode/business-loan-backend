const express = require('express');
const router = express.Router();
const apiService = require('./api.service');

router.get('/application', appId);
router.get('/balance', balanceSheet);
router.post('/decision', requestOutcome);

module.exports = router;

function balanceSheet(req, res, next) {
  const provider = req.query.provider;
  const company = req.query.company;

  apiService
    .fetchBalance(provider, company)
    .then((v) => {
      res.status(200).json(v);
    })
    .catch((err) => next(err));
}

function requestOutcome(req, res, next) {
  apiService
    .requestOutcome(req.body)
    .then((v) => {
      res.status(200).json(v);
    })
    .catch((err) => next(err));
}

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
