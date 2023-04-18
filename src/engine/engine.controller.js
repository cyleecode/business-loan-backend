const express = require('express');
const router = express.Router();
const service = require('./engine.mock');

router.post('/decision', makeDecision);

module.exports = router;

function makeDecision(req, res, next) {
  const { name, year, profitOrLost, preAssessment } = req.body;
  res.status(200).json(service.decisionEngine());
  return;
}
