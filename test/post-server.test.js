'use strict';

const assert = require(`assert`);
const request = require(`supertest`);
const {app} = require(`../src/server`);
const testOffer = require(`./fixtures/test-offer`);

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
    assert.deepStrictEqual(offers, sentParams, `Получили, что отправили`);
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

  it(`Метод POST /api/offers должен выдавать код 400 при ошибке валидации приполучении данных с формы`, async () => {
    const response = await request(app)
      .post(`/api/offers`)
      .field(`location`, 10)
      .field(`date`, 100)
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
