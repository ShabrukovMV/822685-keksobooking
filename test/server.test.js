'use strict';

const assert = require(`assert`);
const request = require(`supertest`);
const express = require(`express`);
const app = express();

const offerStoreMock = require(`./mock/store-mock`);
const imageStoreMock = require(`./mock/image-store-mock`);

const offersRouter = require(`../src/offers/route`)(offerStoreMock, imageStoreMock);

app.use(`/api/offers`, offersRouter);

app.use((req, res) => {
  res.status(404).send(`Страница ${req.path} не найдена!`);
});

describe(`Методы GET /api/offer`, () => {

  it(`Метод GET /api/offers должен отдавать правильный объект JSON с кодом 200`, async () => {
    const response = await request(app)
      .get(`/api/offers`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);
    const offers = response.body;
    assert.strictEqual(offers.length, 20, `Длина полученного массива должна быть равна 20`);
    assert.strictEqual(!offers[0].author, false, `Первый элемент должен содержать поле "author"`);
    assert.strictEqual(typeof offers[0].author, `object`, `Поле "author" должно быть объектом`);
  });

  it(`Метод GET /api/offers?limit=30&skip=5 должен отдавать правильный объект JSON с кодом 200 длиной 30`, async () => {
    const response = await request(app)
      .get(`/api/offers?limit=30&skip=5`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);
    const offers = response.body;
    assert.strictEqual(offers.length, 30, `Длина полученного массива должна быть равна 30`);
  });

  it(`Отрицательная проверка GET /api/offers`, async () => {
    return await request(app).get(`/api/offersoffers`).set(`Accept`, `application/json`)
      .expect(404)
      .expect(`Страница /api/offersoffers не найдена!`)
      .expect(`Content-Type`, /html/);
  });

  it(`Метод GET api/offers/:date должен отдавать правильный объект JSON с кодом 200`, async () => {
    const response = await request(app)
      .get(`/api/offers/${new Date().setUTCHours(0, 0, 0, 0) / 1000}`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);
    const offers = response.body;
    assert.strictEqual(!offers.author, false, `Найденный элемент должен содержать поле "author"`);
  });

  it(`Отрицательная проверка GET api/offers/:date`, async () => {
    return await request(app).get(`/api/offers/invalid time`).set(`Accept`, `application/json`)
      .expect(400)
      .expect(/(Неверный формат даты {).+(})/)
      .expect(`Content-Type`, /html/);
  });

});

