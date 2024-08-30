const winston = require('winston')

const options = {
  fileInfo: {
    level: 'info',
    filename: './logs/app.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  fileErr: {
    level: 'error',
    filename: './logs/error.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const myPrintfFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.label({ label: 'app' }),
    winston.format.timestamp(),
    myPrintfFormat
  ),
  transports: [
    new winston.transports.File(options.fileInfo),
    new winston.transports.File(options.fileErr),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
})

module.exports = logger