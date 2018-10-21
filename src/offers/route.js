'use strict';

const express = require(`express`);
const offersRouter = express.Router(); // eslint-disable-line new-cap
const multer = require(`multer`);

const NotFoundError = require(`../error/not-found-error`);
const InvalidParamError = require(`../error/invalid-param-error`);

const validate = require(`./validate`);
const ValidationError = require(`../error/validation-error`);
const toStream = require(`buffer-to-stream`);

const upload = multer({storage: multer.memoryStorage()});

const asyncMW = (fn) => (req, res, next) => fn(req, res, next).catch(next);

offersRouter.get(``, asyncMW(async (req, res) => {
  const query = req.query;
  let limit = 20;
  let skip = 0;
  if (query.hasOwnProperty(`skip`)) {
    skip = parseInt(query.skip, 10) ? parseInt(query.skip, 10) : skip;
  }
  if (query.hasOwnProperty(`limit`)) {
    limit = parseInt(query.limit, 10) ? parseInt(query.limit, 10) : limit;
  }
  res.send(await offersRouter.offerStore.getOffersBySkipAndLimit(skip, limit));
}));

offersRouter.get(`/:date`, asyncMW(async (req, res) => {
  const offerDate = req.params.date;
  if (!offerDate) {
    throw new NotFoundError(`В запросе не указана дата`);
  }
  if (isNaN(parseInt(offerDate, 10))) {
    throw new InvalidParamError(`Неверный формат даты {${offerDate}}`);
  }
  const foundOffer = await offersRouter.offerStore.getOfferByDate(parseInt(offerDate, 10));
  if (!foundOffer) {
    throw new NotFoundError(`Предложений по указанной дате не найдено`);
  }
  res.send(foundOffer);
}));

offersRouter.get(`/:date/avatar`, asyncMW(async (req, res) => {
  const offerDate = req.params.date;
  if (!offerDate) {
    throw new NotFoundError(`В запросе не указана дата`);
  }
  if (isNaN(parseInt(offerDate, 10))) {
    throw new InvalidParamError(`Неверный формат даты {${offerDate}}`);
  }
  const foundOffer = await offersRouter.offerStore.getOfferByDate(parseInt(offerDate, 10));

  if (!foundOffer) {
    throw new NotFoundError(`Предложений по указанной дате не найдено`);
  }

  const result = await offersRouter.imageStore.get(foundOffer._id);
  if (!result) {
    throw new NotFoundError(`Предложение на дату ${offerDate} не имеет аватара`);
  }
  res.header(`Content-Type`, `image/png`);
  res.header(`Content-Length`, result.info.length);

  res.on(`error`, (err) => console.error(err));
  res.on(`end`, () => res.end());
  const stream = result.stream;
  stream.on(`error`, (err) => console.error(err));
  stream.on(`end`, () => res.end());
  stream.pipe(res);
}));

offersRouter.post(``, upload.single(`avatar`), asyncMW(async (req, res) => {
  const body = {...req.body};
  const avatar = req.file;
  if (avatar) {
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
  }
  res.send(validated);
}));

offersRouter.use((err, req, res, next) => {
  console.log(`-->`, err.message, `<--`);
  if (err instanceof ValidationError) {
    return res.status(err.code).json(err.errors);
  }
  if (err instanceof NotFoundError) {
    return res.status(err.code).json(err.message);
  }
  if (err instanceof InvalidParamError) {
    return res.status(err.code).send(err.message);
  }
  return next();
});

module.exports = (store, imagestore) => {
  offersRouter.offerStore = store;
  offersRouter.imageStore = imagestore;
  return offersRouter;
};
