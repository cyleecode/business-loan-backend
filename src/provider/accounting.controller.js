const express = require('express');
const router = express.Router();
const service = require('./accounting.mock');

router.get('/balance', getBalance);

module.exports = router;

function getBalance(req, res, next) {
  res.status(200).json(service.getBalance());
  return;
}
