require('dotenv').config({ path: '.env.local' })
const http = require('http');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const port = process.env.PORT ? process.env.PORT : 4000;

app.server = http.createServer(app);
app.use(bodyParser.json({
    limit: '2000kb',
}));

app.use('/', (req, res, next) => {
    res.json('hello world')
})

app.server.listen(port, () => {
    console.log(`Server start on => ${port} with process id ${process.pid}`)
})