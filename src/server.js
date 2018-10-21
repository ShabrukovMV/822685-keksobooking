'use strict';

const packageInfo = require(`../package.json`);

const express = require(`express`);
const offerStore = require(`./offers/store`);
const imageStore = require(`./images/store`);

const offersRouter = require(`./offers/route`)(offerStore, imageStore);
const app = express();

const jsonParser = express.json();

const hostname = `127.0.0.1`;
const staticDir = `${__dirname}/../static`;

const LOG_HANDLER = (req, res, next) => {
  console.log(`Пришёл запрос ${req.method}: ${req.path}, параметры: ${JSON.stringify(req.query)}, тело запроса: ${JSON.stringify(req.body)}`);
  next();
};

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Страница ${req.path} не найдена!`);
};

const ERROR_HANDLER = (err, req, res, next) => {
  if (err) {
    console.log(`Ошибка ${err.code}: ${err.message}`);
    res.status(err.code || 500).send(err.message);
    next();
  }
};

app.use(jsonParser, LOG_HANDLER);

app.use(express.static(staticDir));

app.use(`/api/offers`, offersRouter);

app.use(NOT_FOUND_HANDLER);

app.use(ERROR_HANDLER);

const launchServer = (port) => {
  port = parseInt(port, 10);
  port = port ? port : 3000;
  app.listen(port, hostname, () => {
    console.log(`Сервер ${`«${packageInfo.name}»`.green.bold} запущен по адресу: http://${hostname}:${port}`);
  });
};

module.exports = {
  name: `server`,
  description: `Запускает сервер «${packageInfo.name}».`,
  execute(port = 3000) {
    launchServer(port);
  },
};

module.exports.app = app;
