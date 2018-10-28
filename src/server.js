'use strict';

const packageInfo = require(`../package.json`);
const logger = require(`./logger`);

const express = require(`express`);

const offerStore = require(`./offers/store`);
const imageStore = require(`./images/store`);
const offersRouter = require(`./offers/route/indexroute`)(offerStore, imageStore);

const app = express();

const {
  SERVER_HOST = `localhost`,
  SERVER_PORT = 3000,
} = process.env;

const staticDir = `${__dirname}/../static`;

const NOT_FOUND_HANDLER = (req, res) => {
  logger.warn(`Запрашиваемая страница ${req.path} не найдена`);
  res.status(404).send([{error: `Not Found Error`, errorMessage: `Страница ${req.path} не найдена!`}]);
};

app.use(express.static(staticDir));

app.use(`/api/offers`, offersRouter);

app.use(NOT_FOUND_HANDLER);

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

