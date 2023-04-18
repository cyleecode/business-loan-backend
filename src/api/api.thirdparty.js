/**
 * Assuming Accounting software provider and decision engine is using RESTful API
 */

const http = require('http');
function balanceSheetProvider() {
  return new Promise((resolv) => {
    const options = {
      hostname: '127.0.0.1',
      port: process.env.PROVIDER_PORT,
      path: '/balance',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let receive = '';
    const req = http.request(options, (res) => {
      res.on('data', (chunk) => {
        receive += chunk;
      });
      res.on('end', () => {
        resolv(receive);
      });
    });
    req.end();
  });
}

function decisionEngine({ name, year, profitOrLost, preAssessment }) {
  const postData = JSON.stringify({ name, year, profitOrLost, preAssessment });
  return new Promise((resolv) => {
    const options = {
      hostname: '127.0.0.1',
      port: process.env.ENGINE_PORT,
      path: '/decision',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };
    let receive = '';
    const req = http.request(options, (res) => {
      res.on('data', (chunk) => {
        receive += chunk;
      });
      res.on('end', () => {
        resolv(receive);
      });
    });
    req.end();
  });
}

module.exports = {
  balanceSheetProvider,
  decisionEngine,
};
