'use strict';

const logger = require(`../logger`);

const NotFoundError = require(`../error/not-found-error`);
const InvalidParamError = require(`../error/invalid-param-error`);
const ValidationError = require(`../error/validation-error`);

module.exports = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    logger.error(err.errors);
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
  if (err.name === `MongoError`) {
    logger.error(`Ошибка MongoDB: ${err.message}`);
    return res.status(400).send(err.message);
  }
  logger.error(`Необработанная ошибка: ${err.message}`);
  return next();
};