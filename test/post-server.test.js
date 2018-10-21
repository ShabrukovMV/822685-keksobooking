'use strict';

const assert = require(`assert`);
const request = require(`supertest`);
const {app} = require(`../src/server`);
const testOffer = require(`./fixtures/test-offer`);

const offerStoreMock = require(`./mock/store-mock`);
const imageStoreMock = require(`./mock/image-store-mock`);

const offersRouter = require(`../src/offers/route`)(offerStoreMock, imageStoreMock);

app.use(`/api/offers`, offersRouter);

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
    console.log(`Метод POST /api/offers начался`);
    const response = await request(app)
      .post(`/api/offers`)
      .field(`author`, ``)
      .field(`date`, 1539475200)
      .attach(`avatar`, `./test/fixtures/avatar.png`)
      .set(`Accept`, `multipart/form-data`)
      .expect(200)
      .expect(`Content-Type`, /json/);
    const offers = response.body;
    assert.deepEqual(offers.author.avatar, `avatar.png`, `Получили тестовый файл`);
  });


  it(`Метод POST /api/offers должен выдавать код 400 при ошибке валидации при получении данных с формы`, async () => {
    const response = await request(app)
      .post(`/api/offers`)
      .field(`author`, `Michael`)
      .field(`offer`, ``)
      .set(`Accept`, `multipart/form-data`)
      .expect(400)
      .expect(`Content-Type`, /json/);
    const offers = response.body;
    assert(Array.isArray(offers), `При ошибке валидации в теле ошибки должен быть массив с сообщениями`);
    assert(offers.length > 0, `Тело ошибки не может быть пустым`);
  });

});
