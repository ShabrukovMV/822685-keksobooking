'use strict';

const logger = require(`../../logger`);

const NotFoundError = require(`../../error/not-found-error`);
const InvalidParamError = require(`../../error/invalid-param-error`);
const ValidationError = require(`../../error/validation-error`);

const MongoError = require(`mongodb`).MongoError;

const OFFERS_ROUTE_ERRORS = (err, req, res, _next) => {
  if (err instanceof ValidationError) {
    logger.error(`${err.message}: ${JSON.stringify(err.errors)}`);
    return res.status(err.code).send(err.errors);
  }
  if (err instanceof NotFoundError) {
    logger.error(err.message);
    return res.status(err.code).send(err.error);
  }
  if (err instanceof InvalidParamError) {
    logger.error(err.message);
    return res.status(err.code).send(err.error);
  }
  if (err instanceof MongoError) {
    logger.error(`Ошибка MongoDB: ${err.message}`);
    return res.status(400).send(err.message);
  }
  logger.error(`Необработанная ошибка: ${err.message}`);
  return res.status(err.code || 500).send([{error: `Internal Server Error`, errorMessage: err.message}]);
};

module.exports = (offersRouter) => {
  offersRouter.use(OFFERS_ROUTE_ERRORS);
};


