'use strict';

const logger = require(`../logger`);

const express = require(`express`);
const offersRouter = express.Router(); // eslint-disable-line new-cap
const multer = require(`multer`);

const NotFoundError = require(`../error/not-found-error`);
const InvalidParamError = require(`../error/invalid-param-error`);

const validate = require(`./validate`);
const ValidationError = require(`../error/validation-error`);
const toStream = require(`buffer-to-stream`);

const jsonParser = express.json();
const upload = multer({storage: multer.memoryStorage()});

const asyncMW = (fn) => (req, res, next) => fn(req, res, next).catch(next);

offersRouter.get(``, asyncMW(async (req, res) => {
  const {limit = 20, skip = 0} = req.query;

  logger.verbose(Object.keys(req.query).length ? `Параметры запроса: ${JSON.stringify(req.query)}` : `Параметров у запроса нет`);

  if (isNaN(parseInt(skip, 10))) {
    logger.error(`Недопустимое значение параметра ${JSON.stringify({skip})}`);
    throw new InvalidParamError(`Недопустимое значение параметра ${JSON.stringify({skip})}`);
  }

  if (isNaN(parseInt(limit, 10))) {
    logger.error(`Недопустимое значение параметра ${JSON.stringify({limit})}`);
    throw new InvalidParamError(`Недопустимое значение параметра ${JSON.stringify({limit})}`);
  }
  res.send(await offersRouter.offerStore.getOffersBySkipAndLimit(parseInt(skip, 10), parseInt(limit, 10)));
}));

offersRouter.get(`/:date`, asyncMW(async (req, res) => {
  const offerDate = req.params.date;
  logger.verbose(`В запросе указана дата {${offerDate}}`);
  if (isNaN(parseInt(offerDate, 10))) {
    logger.error(`Неверный формат даты {${offerDate}}`);
    throw new InvalidParamError(`Неверный формат даты {${offerDate}}`);
  }
  const foundOffer = await offersRouter.offerStore.getOfferByDate(parseInt(offerDate, 10));
  if (!foundOffer) {
    logger.error(`Предложений по указанной дате {${offerDate}} не найдено`);
    throw new NotFoundError(`Предложений по указанной дате {${offerDate}} не найдено`);
  }
  res.send(foundOffer);
}));

offersRouter.get(`/:date/avatar`, asyncMW(async (req, res) => {
  const offerDate = req.params.date;
  logger.verbose(`В запросе указана дата {${offerDate}}`);
  if (isNaN(parseInt(offerDate, 10))) {
    throw new InvalidParamError(`Неверный формат даты {${offerDate}}`);
  }
  const foundOffer = await offersRouter.offerStore.getOfferByDate(parseInt(offerDate, 10));

  if (!foundOffer) {
    logger.error(`Предложений по указанной дате {${offerDate}} не найдено`);
    throw new NotFoundError(`Предложений по указанной дате {${offerDate}} не найдено`);
  }

  const result = await offersRouter.imageStore.get(foundOffer._id);
  if (!result) {
    logger.error(`Предложение на дату ${offerDate} не имеет аватара`);
    throw new NotFoundError(`Предложение на дату ${offerDate} не имеет аватара`);
  }
  res.header(`Content-Type`, `image/png`);
  res.header(`Content-Length`, result.info.length);

  logger.verbose(`Передаём аватар, размер: ${result.info.length} байт`);
  res.on(`error`, (err) => logger.error(`Ошибка чтения потока: ${err.message}`));
  res.on(`end`, () => {
    logger.verbose(`Передача аватара завешена: readstream`);
    res.end();
  });
  const stream = result.stream;
  stream.on(`error`, (err) => logger.error(`Ошибка записи потока: ${err.message}`));
  stream.on(`end`, () => {
    logger.verbose(`Передача аватара завешена: writestream`);
    res.end();
  });
  stream.pipe(res);
}));

offersRouter.post(``, jsonParser, upload.single(`avatar`), asyncMW(async (req, res) => {
  const body = {...req.body};
  logger.verbose(`Тело запроса: ${JSON.stringify(body)}`);
  const avatar = req.file;
  if (avatar) {
    logger.verbose(`Пришёл файл аватара: ${avatar.originalname}, тип: ${avatar.mimetype}, размер ${avatar.size} байт`);
    body.author = {avatar: avatar.originalname};
    if (body.date) {
      body.date = parseInt(body.date, 10);
    }
  }
  const validated = validate(body);

  const result = await offersRouter.offerStore.putOffer(validated);
  const insertedId = result.insertedId;

  if (avatar) {
    await offersRouter.imageStore.save(insertedId, toStream(avatar.buffer));
    logger.verbose(`Файл аватара: ${avatar.originalname}, размер ${avatar.size} байт сохранён в БД`);
  }
  res.send(validated);
}));

offersRouter.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.code).send(err.errors);
  }
  if (err instanceof NotFoundError) {
    return res.status(err.code).send(err.message);
  }
  if (err instanceof InvalidParamError) {
    return res.status(err.code).send(err.message);
  }
  if (err.name === `MongoError`) {
    logger.error(`Ошибка MongoDB: ${err.message}`);
    return res.status(400).send(err.message);
  }
  logger.error(`Необработанная ошибка: ${err.message}`);
  return next();
});

module.exports = (store, imagestore) => {
  offersRouter.offerStore = store;
  offersRouter.imageStore = imagestore;
  return offersRouter;
};
