'use strict';

const packageInfo = require(`../package.json`);
const logger = require(`./logger`);

const express = require(`express`);

const offerStore = require(`./offers/store`);
const imageStore = require(`./images/store`);

const offersRouter = require(`./offers/route`)(offerStore, imageStore);
const offersAvatarRouter = require(`./offers/route-avatar`)(offerStore, imageStore);
const offersErrorRouter = require(`./offers/route-errors`);

const app = express();

const {
  SERVER_HOST = `localhost`,
  SERVER_PORT = 3000,
} = process.env;

const staticDir = `${__dirname}/../static`;

const CORS_HANDLER = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
};

const LOG_REQUEST_HANDLER = (req, res, next) => {
  logger.verbose(`Пришёл запрос ${req.method}: ${req.path}`);
  next();
};

const NOT_FOUND_HANDLER = (req, res) => {
  logger.warn(`Запрашиваемая страница ${req.path} не найдена`);
  res.status(404).send([{error: `Not Found Error`, errorMessage: `Страница ${req.path} не найдена!`}]);
};

const ERROR_HANDLER = (err, req, res, next) => {
  if (err) {
    logger.error(`Внутренняя ошибка сервера ${err.code}: ${err.message}`);
    res.status(err.code || 500).send([{error: `Not Found Error`, errorMessage: err.message}]);
    next();
  }
};

app.use(CORS_HANDLER);

app.use(express.static(staticDir));

app.use(LOG_REQUEST_HANDLER);

app.use(`/api/offers`, offersRouter, offersAvatarRouter, offersErrorRouter);

app.use(NOT_FOUND_HANDLER);

app.use(ERROR_HANDLER);

const launchServer = ({host, port}) => {
  port = parseInt(port, 10);
  app.listen(port, host, () => {
    logger.info(`Сервер ${`«${packageInfo.name}»`.green.bold} запущен по адресу: http://${host}:${port}`);
  });
};

module.exports = {
  name: `server`,
  description: `Запускает сервер «${packageInfo.name}».`,
  execute(port = SERVER_PORT, host = SERVER_HOST) {
    launchServer({host, port});
  },
};

