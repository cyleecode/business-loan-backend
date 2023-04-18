require('dotenv').config({ path: '.env.local' });
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const provider = express();
const engine = express();
const port = process.env.PORT ? process.env.PORT : 4000;
const provider_port = process.env.PROVIDER_PORT;
const engine_port = process.env.ENGINE_PORT;

app.server = http.createServer(app);
provider.server = http.createServer(provider);
engine.server = http.createServer(engine);
app.use(
  bodyParser.json({
    limit: '2000kb',
  })
);

app.use('/api', require('./src/api/api.controller'));
engine.use('/', (req, res, next) => {});
provider.use('/', (req, res, next) => {});

app.server.listen(port, () => {
  console.log(`App Server start on => ${port} with process id ${process.pid}`);
});
engine.server.listen(engine_port, () => {
  console.log(
    `Enginer server start on => ${engine_port} with process id ${process.pid}`
  );
});
provider.server.listen(provider_port, () => {
  console.log(
    `Enginer server start on => ${provider_port} with process id ${process.pid}`
  );
});
