'use strict';

const {createLogger, format, transports} = require(`winston`);
const {combine, timestamp} = format;
const {SERVER_LOG_LEVEL = `INFO`} = process.env;

const logger = createLogger({
  level: SERVER_LOG_LEVEL,
  format: combine(timestamp(), format.json()),
  transports: [
    new transports.File({filename: `error.log`, level: `warn`}),
    new transports.File({filename: `combined.log`}),
  ],
});

if (process.env.NODE_ENV !== `production`) {
  logger.add(new transports.Console({
    level: `silly`,
    format: combine(timestamp(), format.simple()),
  }));
}

module.exports = logger;
