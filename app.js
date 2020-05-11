const express = require('express');
const helmet = require('helmet');
const http = require('http');
const morgan = require('morgan');
const variables = require('./config/variables');
const winston = require('./config/winston');
const router = require('./src/routes/index');
const bodyParser = require('body-parser');
const colors = require('colors');
const Telnet = require('telnet-client');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception: ', err);
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection: Promise:', p, 'Reason:', reason);
});

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(helmet());
app.disable('x-powered-by');

app.use(morgan('dev', { stream: winston.stream }));

app.use('/', router);

let connection = new Telnet();
let params = {
  host: '192.168.1.71',
  port: 55443,
  negotiationMandatory: true,
  timeout: 1000,
  shellPrompt: '',
  debug: true
};

connection.connect(params);
connection.send('{"id": 1, "method": "toggle", "params": []}\r\n');

server.listen(variables.port, () =>
  console.log(
    'The Yeelight REST api is running on port:  '.cyan + `${variables.port}`.green
  )
);
