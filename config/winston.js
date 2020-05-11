const appRoot = require('app-root-path');
const winston = require('winston');

// define the custom settings for each transport (file, console)
const options = {
  file: {
    colorize: false,
    filename: `${appRoot}/logs/app.log`,
    format: winston.format.json(),
    handleExceptions: true,
    json: true,
    level: 'info',
    maxFiles: 5,
    maxsize: 5242880 // 5MB
  },
  error: {
    colorize: false,
    filename: `${appRoot}/logs/error.log`,
    format: winston.format.json(),
    handleExceptions: true,
    json: true,
    level: 'error',
    maxFiles: 5,
    maxsize: 5242880 // 5MB
  },
  console: {
    colorize: true,
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    handleExceptions: true,
    json: true,
    level: 'debug'
  }
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  exitOnError: false, // do not exit on handled exceptions
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.File(options.error),
    new winston.transports.File(options.file)
  ]
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message) {
    // use the 'info' log level so the output will
    // be picked up by both transports (file and console)
    logger.info(message);
  }
};

module.exports = logger;
