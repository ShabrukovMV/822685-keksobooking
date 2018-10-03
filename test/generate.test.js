'use strict';

const assert = require(`assert`);
const generateEntity = require(`../src/generate`);
const titleFieldValues = [`Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`];
const typeFieldValues = [`flat`, `palace`, `house`, `bungalo`];
const checkinOutFieldValues = [`12:00`, `13:00`, `14:00`];
const featuresFieldValues = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const photosFieldValues = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`].sort();
const checkTypesOfArrayElements = (item) => {
  return typeof item === `string`;
};
const checkOccurrencesOfArrayElements = (item) => {
  return featuresFieldValues.indexOf(item) > -1;
};
const hasDuplicateElements = (array) => {
  return (new Set(array)).size !== array.length;
};

describe(`Модуль generate`, () => {

  it(`Модуль должен экспортировать функцию c именем generateEntity`, () => {
    assert.equal(typeof generateEntity, `function`);
    assert.equal(generateEntity.name, `generateEntity`);
  });
  it(`Значение функции должно быть объектом`, () => {
    assert.equal(typeof generateEntity(), `object`);
    assert.notEqual(generateEntity(), null, `Значение функции null`);
  });

  describe(`Правила для поля "author"`, () => {
    it(`Существует поле "author" типа "object"`, () => {
      assert(generateEntity().hasOwnProperty(`author`), `Поле "author" отсутствует`);
      assert.equal(typeof generateEntity()[`author`], `object`);
      assert.notEqual(generateEntity()[`author`], null, `Поле "author" имеет значние null`);
    });
    it(`Существует поле "author.avatar" типа "string"`, () => {
      assert(generateEntity()[`author`].hasOwnProperty(`avatar`), `Поле "author.avatar" отсутсвует`);
      assert.equal(typeof generateEntity()[`author`][`avatar`], `string`);
    });
  });

  describe(`Правила для поля "offer"`, () => {
    it(`Существует поле "offer" типа "object"`, () => {
      assert(generateEntity().hasOwnProperty(`offer`), `Поле "offer" отстутвует`);
      assert.equal(typeof generateEntity()[`offer`], `object`);
      assert.notEqual(generateEntity()[`offer`], null, `Поле "offer" имеет значние null`);
    });
    it(`Существует поле "offer.title" типа "string" и его значение содержится в списке ["${titleFieldValues.join(`","`)}"]`, () => {
      assert(generateEntity()[`offer`].hasOwnProperty(`title`), `Поле "offer.title" отсутствует`);
      assert.equal(typeof generateEntity()[`offer`][`title`], `string`);
      assert.notEqual(titleFieldValues.indexOf(generateEntity()[`offer`][`title`]), -1, `Значение поля "offer.title" отсутствует в списке ["${titleFieldValues.join(`","`)}"]`);
    });
    it(`Существует поле "offer.address" типа "string" формата "location.x,location.y"`, () => {
      assert(generateEntity()[`offer`].hasOwnProperty(`address`), `Поле "offer.address" отсутствует`);
      assert.equal(typeof generateEntity()[`offer`][`address`], `string`);
      assert.notEqual(generateEntity()[`offer`][`address`].search(/^\d+,\d+$/), -1, `Поле "offer.address" не формата "x,y"`);
      assert.equal(generateEntity()[`offer`][`address`], `${generateEntity()[`location`][`x`]},${generateEntity()[`location`][`y`]}`);
    });
    it(`Существует поле "offer.price" типа "number" от 1000 до 1000000`, () => {
      assert(generateEntity()[`offer`].hasOwnProperty(`price`), `Поле "offer.price" отсутствует`);
      assert.equal(typeof generateEntity()[`offer`][`price`], `number`);
      assert(generateEntity()[`offer`][`price`] >= 1000, `Значение поля "offer.price" меньше 1000`);
      assert(generateEntity()[`offer`][`price`] <= 1000000, `Значение поля "offer.price" больше 1000000`);
    });
    it(`Существует поле "offer.type" типа "string" и его значение содержится в списке ["${typeFieldValues.join(`","`)}"]`, () => {
      assert(generateEntity()[`offer`].hasOwnProperty(`type`), `Поле "offer.type" отсутствует`);
      assert.equal(typeof generateEntity()[`offer`][`type`], `string`);
      assert.notEqual(typeFieldValues.indexOf(generateEntity()[`offer`][`type`]), -1, `Значение поля "offer.type" отсутствует в списке ["${typeFieldValues.join(`","`)}"]`);
    });
    it(`Существует поле "offer.rooms" типа "number" от 1 до 5`, () => {
      assert(generateEntity()[`offer`].hasOwnProperty(`rooms`), `Поле "offer.rooms" отсутствует`);
      assert.equal(typeof generateEntity()[`offer`][`rooms`], `number`);
      assert(generateEntity()[`offer`][`rooms`] >= 1, `Значение поля "offer.rooms" меньше 1`);
      assert(generateEntity()[`offer`][`rooms`] <= 5, `Значение поля "offer.rooms" больше 5`);
    });
    it(`Существует поле "offer.guests" типа "number" значение больше 0`, () => {
      assert(generateEntity()[`offer`].hasOwnProperty(`guests`), `Поле "offer.guests" отсутствует`);
      assert.equal(typeof generateEntity()[`offer`][`guests`], `number`);
      assert(generateEntity()[`offer`][`guests`] > 0, `Значение поля "offer.guests" меньше 1`);
    });
    it(`Существует поле "offer.checkin" типа "string" и его значение содержится в списке ["${checkinOutFieldValues.join(`","`)}"]`, () => {
      assert(generateEntity()[`offer`].hasOwnProperty(`checkin`), `Поле "offer.checkin" отсутствует`);
      assert.equal(typeof generateEntity()[`offer`][`checkin`], `string`);
      assert.notEqual(checkinOutFieldValues.indexOf(generateEntity()[`offer`][`checkin`]), -1, `Значение поля "offer.checkin" отсутствует в списке ["${checkinOutFieldValues.join(`","`)}]"`);
    });
    it(`Существует поле "offer.checkout" типа "string" и его значение содержится в списке ["${checkinOutFieldValues.join(`","`)}"]`, () => {
      assert(generateEntity()[`offer`].hasOwnProperty(`checkout`), `Поле "offer.checkout" отсутствует`);
      assert.equal(typeof generateEntity()[`offer`][`checkout`], `string`);
      assert.notEqual(checkinOutFieldValues.indexOf(generateEntity()[`offer`][`checkout`]), -1, `Значение поля "offer.checkout" отсутствует в списке ["${checkinOutFieldValues.join(`","`)}"]`);
    });
    it(`Существует поле "offer.features" типа "array" содержащее неповторяющиеся элементы типа "string", содержащихся в списке ["${featuresFieldValues.join(`","`)}"]`, () => {
      assert(generateEntity()[`offer`].hasOwnProperty(`features`), `Поле "offer.features" отсутствует`);
      assert(Array.isArray(generateEntity()[`offer`][`features`]), `Поле "offer.features" не типа "array"`);
      assert(generateEntity()[`offer`][`features`].length > 0, `Поле "offer.features" содержит пустой массив`);
      assert(generateEntity()[`offer`][`features`].every(checkTypesOfArrayElements), `Не все элементы "offer.features" имеют тип "string"]`);
      assert(generateEntity()[`offer`][`features`].every(checkOccurrencesOfArrayElements), `Не все элементы "offer.features" присутствуют в списке ["${featuresFieldValues.join(`","`)}"]`);
      assert(!hasDuplicateElements(generateEntity()[`offer`][`features`]), `Элементы массива "offer.features" дублируются`);
    });
    it(`Существует поле "offer.description" и содержит пустую строку`, () => {
      assert(generateEntity()[`offer`].hasOwnProperty(`description`), `Поле "offer.description" отсутствует`);
      assert.equal(typeof generateEntity()[`offer`][`description`], `string`);
      assert.equal(generateEntity()[`offer`][`description`], ``, `Поле "offer.description" не является пустой строкой`);
    });
    it(`Существует поле "offer.photos" типа "array" содержащее все элементы типа "string", содержащихся в списке ["${photosFieldValues.join(`","`)}"]`, () => {
      assert(generateEntity()[`offer`].hasOwnProperty(`photos`), `Поле "offer.photos" отсутствует`);
      assert(Array.isArray(generateEntity()[`offer`][`photos`]), `Поле "offer.photos" не типа "array"`);
      assert(generateEntity()[`offer`][`photos`].length > 0, `Поле "offer.photos" содержит пустой массив`);
      assert(generateEntity()[`offer`][`photos`].every(checkTypesOfArrayElements), `Не все элементы "offer.features" имеют тип "string"]`);
      assert.deepEqual(generateEntity()[`offer`][`photos`].sort(), photosFieldValues, `Массив "offer.photos" содержит значения не соответсвующие списку ["${photosFieldValues.join(`","`)}"]`);
    });
  });
  describe(`Правила для поля "location"`, () => {
    it(`Существует поле "location" типа "object"`, () => {
      assert(generateEntity().hasOwnProperty(`location`), `Поле "location" отсутствует`);
      assert.equal(typeof generateEntity()[`location`], `object`);
      assert.notEqual(generateEntity()[`location`], null, `Поле "location" имеет значние null`);
    });
    it(`Существует поле "location.x" типа "number" от 300 до 900`, () => {
      assert(generateEntity()[`location`].hasOwnProperty(`x`), `Поле "location.x" отсутствует`);
      assert.equal(typeof generateEntity()[`location`][`x`], `number`);
      assert(generateEntity()[`location`][`x`] >= 300, `Значение поля "location.rooms" меньше 300`);
      assert(generateEntity()[`location`][`x`] <= 900, `Значение поля "location.rooms" больше 900`);
    });
    it(`Существует поле "location.y" типа "number" от 150 до 500`, () => {
      assert(generateEntity()[`location`].hasOwnProperty(`y`), `Поле "location.y" отсутствует`);
      assert.equal(typeof generateEntity()[`location`][`y`], `number`);
      assert(generateEntity()[`location`][`y`] >= 150, `Значение поля "location.y" меньше 150`);
      assert(generateEntity()[`location`][`y`] <= 500, `Значение поля "location.y" больше 500`);
    });
  });
  describe(`Правила для поля "date"`, () => {
    it(`Существует поле "date" типа "number" от сейчас минус 7 дней`, () => {
      assert(generateEntity().hasOwnProperty(`date`), `Поле "date" отстутвует`);
      assert.equal(typeof generateEntity()[`date`], `number`);
      assert(generateEntity()[`date`] > (new Date() / 1000 - 60 * 60 * 24 * 7), `Значение поля "date" меньше чем 7 дней назад`);
      assert(generateEntity()[`date`] < (new Date() / 1000), `Значение поля "date" больше чем сейчас`);
    });
  });
});
