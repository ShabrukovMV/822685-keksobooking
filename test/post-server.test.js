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

  it(`Метод POST /api/offers должен отправлять параметры в JSON и получать данные из формы с кодом 200`, async () => {
    const sentParams = {skip: 0, limit: 20};
    const response = await request(app)
      .post(`/api/offers`)
      .field(`skip`, sentParams.skip)
      .field(`limit`, sentParams.limit)
      .set(`Accept`, `multipart/form-data`)
      .expect(200)
      .expect(`Content-Type`, /json/);
    const offers = response.body;
    assert.deepEqual(offers, sentParams, `Получили из формы, что отправили`);
  });

});
