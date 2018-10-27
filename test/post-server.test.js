'use strict';

const assert = require(`assert`);
const request = require(`supertest`);
const testOffer = require(`./fixtures/test-offer`);

const express = require(`express`);
const app = express();

const offerStoreMock = require(`./mock/store-mock`);
const imageStoreMock = require(`./mock/image-store-mock`);

const offersRouter = require(`../src/offers/route`)(offerStoreMock, imageStoreMock);
const offersAvatarRouter = require(`../src/offers/route-avatar`)(offerStoreMock, imageStoreMock);
const offersErrorRouter = require(`../src/offers/route-errors`);

app.use(`/api/offers`, offersRouter, offersAvatarRouter, offersErrorRouter);

describe(`Методы POST api/offers`, () => {

  it(`Метод POST /api/offers должен отправлять параметры в JSON и получать правильный объект JSON с кодом 200`, async () => {
    const sentParams = testOffer;
    const response = await request(app)
      .post(`/api/offers`)
      .send(sentParams)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);
    const offers = response.body;
    assert.deepEqual(offers, sentParams, `Получили, что отправили`);
  });

  it(`Метод POST /api/offers должен выдавать код 400 при ошибке валидации`, async () => {
    const sentParams = {skip: 0, limit: 20, author: `Michael`};
    const response = await request(app)
      .post(`/api/offers`)
      .send(sentParams)
      .set(`Accept`, `application/json`)
      .expect(400)
      .expect(`Content-Type`, /json/);
    const offers = response.body;
    assert(Array.isArray(offers), `При ошибке валидации в теле ошибки должен быть массив с сообщениями`);
    assert(offers.length > 0, `Тело ошибки не может быть пустым`);
  });

  it(`Метод POST /api/offers должен получить файл из формы без ошибок`, async () => {
    const response = await request(app)
      .post(`/api/offers`)
      .field(`name`, `Michael`)
      .field(`title`, `Неуютное бунгало по колено в воде`)
      .field(`type`, `bungalo`)
      .field(`address`, `300,400`)
      .field(`price`, 9999)
      .field(`checkin`, `12:00`)
      .field(`checkout`, `12:00`)
      .field(`rooms`, 3)
      .attach(`avatar`, `./test/fixtures/avatar.png`)
      .set(`Accept`, `multipart/form-data`)
      .expect(200)
      .expect(`Content-Type`, /json/);
    const offers = response.body;
    console.log(offers);
    assert(!!offers.author.avatar, `Получили тестовый файл автара`);
  });


  it(`Метод POST /api/offers должен выдавать код 400 при ошибке валидации при получении данных с формы`, async () => {
    const response = await request(app)
      .post(`/api/offers`)
      .field(`name`, `Michael`)
      .field(`title`, `Тестовое объявление`)
      .field(`address`, `100, 200`)
      .set(`Accept`, `multipart/form-data`)
      .expect(400)
      .expect(`Content-Type`, /json/);
    const offers = response.body;
    assert(Array.isArray(offers), `При ошибке валидации в теле ошибки должен быть массив с сообщениями`);
    assert(offers.length > 0, `Тело ошибки не может быть пустым`);
  });

});
