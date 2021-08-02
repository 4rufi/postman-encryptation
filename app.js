/* eslint-disable */
const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const HttpStatus = require('http-status-codes');

const MODULE = 'app.js';
const app = express();

app.enable('trust proxy');
app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cookieParser());

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.status(HttpStatus.OK).end();
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('build-number', '*');
  next();
});

app.use(compression());

app.use('/app', require(`./app/routes/route`));

function handleFatalError(error) {
  console.log('handleFatalError', error);
  process.exit(1);
}

process.on('unhandledRejection', handleFatalError);
process.on('uncaughtException', handleFatalError);

module.exports = app;
