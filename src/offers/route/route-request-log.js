'use strict';

const logger = require(`../../logger`);

const REQUEST_LOG = (req, res, next) => {
  logger.verbose(`Пришёл запрос ${req.method}: ${req.path}`);
  logger.verbose(`Принимаемые данные: ${req.header(`accept`)}`);
  next();
};

module.exports = (offersRouter) => {
  offersRouter.use(REQUEST_LOG);
};
