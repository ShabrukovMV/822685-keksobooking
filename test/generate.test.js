'use strict';

const assert = require(`assert`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const generateEntity = require(`../src/generate`);
const conditions = require(`../src/generate-conditions`);
const generateToFile = require(`../src/generate-to-file`);

const fsaccess = promisify(fs.access);
const fsunlink = promisify(fs.unlink);

const titleFieldValues = conditions.offer.title.values;
const typeFieldValues = conditions.offer.type.values;
const checkinFieldValues = conditions.offer.checkin.values;
const checkoutFieldValues = conditions.offer.checkout.values;
const featuresFieldValues = conditions.offer.features.values;
const photosFieldValues = conditions.offer.photos.values.sort();

const checkTypesOfArrayElements = (item) => {
  return typeof item === `string`;
};
const checkOccurrencesOfArrayElements = (item) => {
  return featuresFieldValues.indexOf(item) > -1;
};
const hasDuplicateElements = (array) => {
  return (new Set(array)).size !== array.length;
};

const entity = generateEntity();

describe(`Модуль generate`, () => {

  before(() => {
    console.log(`Сгенерированные данные функции generateEntity:`);
    console.log(entity);
  });

  it(`Модуль должен экспортировать функцию c именем generateEntity`, () => {
    assert.equal(typeof generateEntity, `function`);
    assert.equal(generateEntity.name, `generateEntity`);
  });
  it(`Значение функции должно быть объектом`, () => {
    assert.equal(typeof entity, `object`);
    assert.notEqual(entity, null, `Значение функции null`);
  });

  describe(`Правила для поля "author"`, () => {
    it(`Существует поле "author" типа "object"`, () => {
      assert(entity.hasOwnProperty(`author`), `Поле "author" отсутствует`);
      assert.equal(typeof entity[`author`], `object`);
      assert.notEqual(entity[`author`], null, `Поле "author" имеет значние null`);
    });
    it(`Существует поле "author.avatar" типа "string"`, () => {
      assert(entity[`author`].hasOwnProperty(`avatar`), `Поле "author.avatar" отсутсвует`);
      assert.equal(typeof entity[`author`][`avatar`], `string`);
    });
  });

  describe(`Правила для поля "offer"`, () => {
    it(`Существует поле "offer" типа "object"`, () => {
      assert(entity.hasOwnProperty(`offer`), `Поле "offer" отстутвует`);
      assert.equal(typeof entity[`offer`], `object`);
      assert.notEqual(entity[`offer`], null, `Поле "offer" имеет значние null`);
    });
    it(`Существует поле "offer.title" типа "string" и его значение содержится в списке ["${titleFieldValues.join(`","`)}"]`, () => {
      assert(entity[`offer`].hasOwnProperty(`title`), `Поле "offer.title" отсутствует`);
      assert.equal(typeof entity[`offer`][`title`], `string`);
      assert.notEqual(titleFieldValues.indexOf(entity[`offer`][`title`]), -1, `Значение поля "offer.title" отсутствует в списке ["${titleFieldValues.join(`","`)}"]`);
    });
    it(`Существует поле "offer.address" типа "string" формата "location.x,location.y"`, () => {
      assert(entity[`offer`].hasOwnProperty(`address`), `Поле "offer.address" отсутствует`);
      assert.equal(typeof entity[`offer`][`address`], `string`);
      assert.notEqual(entity[`offer`][`address`].search(/^\d+,\d+$/), -1, `Поле "offer.address" не формата "x,y"`);
      assert.equal(entity[`offer`][`address`], `${entity[`location`][`x`]},${entity[`location`][`y`]}`);
    });
    it(`Существует поле "offer.price" типа "number" от ${conditions.offer.price.min} до ${conditions.offer.price.max}`, () => {
      assert(entity[`offer`].hasOwnProperty(`price`), `Поле "offer.price" отсутствует`);
      assert.equal(typeof entity[`offer`][`price`], `number`);
      assert(entity[`offer`][`price`] >= conditions.offer.price.min, `Значение поля "offer.price" меньше ${conditions.offer.price.min}`);
      assert(entity[`offer`][`price`] <= conditions.offer.price.max, `Значение поля "offer.price" больше ${conditions.offer.price.max}`);
    });
    it(`Существует поле "offer.type" типа "string" и его значение содержится в списке ["${typeFieldValues.join(`","`)}"]`, () => {
      assert(entity[`offer`].hasOwnProperty(`type`), `Поле "offer.type" отсутствует`);
      assert.equal(typeof entity[`offer`][`type`], `string`);
      assert.notEqual(typeFieldValues.indexOf(entity[`offer`][`type`]), -1, `Значение поля "offer.type" отсутствует в списке ["${typeFieldValues.join(`","`)}"]`);
    });
    it(`Существует поле "offer.rooms" типа "number" от ${conditions.offer.rooms.min} до ${conditions.offer.rooms.max}`, () => {
      assert(entity[`offer`].hasOwnProperty(`rooms`), `Поле "offer.rooms" отсутствует`);
      assert.equal(typeof entity[`offer`][`rooms`], `number`);
      assert(entity[`offer`][`rooms`] >= conditions.offer.rooms.min, `Значение поля "offer.rooms" меньше ${conditions.offer.rooms.min}`);
      assert(entity[`offer`][`rooms`] <= conditions.offer.rooms.max, `Значение поля "offer.rooms" больше ${conditions.offer.rooms.max}`);
    });
    it(`Существует поле "offer.guests" типа "number" значение не меньше ${conditions.offer.guests.min}`, () => {
      assert(entity[`offer`].hasOwnProperty(`guests`), `Поле "offer.guests" отсутствует`);
      assert.equal(typeof entity[`offer`][`guests`], `number`);
      assert(entity[`offer`][`guests`] >= conditions.offer.guests.min, `Значение поля "offer.guests" меньше ${conditions.offer.guests.min}`);
    });
    it(`Существует поле "offer.checkin" типа "string" и его значение содержится в списке ["${checkinFieldValues.join(`","`)}"]`, () => {
      assert(entity[`offer`].hasOwnProperty(`checkin`), `Поле "offer.checkin" отсутствует`);
      assert.equal(typeof entity[`offer`][`checkin`], `string`);
      assert.notEqual(checkinFieldValues.indexOf(entity[`offer`][`checkin`]), -1, `Значение поля "offer.checkin" отсутствует в списке ["${checkinFieldValues.join(`","`)}]"`);
    });
    it(`Существует поле "offer.checkout" типа "string" и его значение содержится в списке ["${checkoutFieldValues.join(`","`)}"]`, () => {
      assert(entity[`offer`].hasOwnProperty(`checkout`), `Поле "offer.checkout" отсутствует`);
      assert.equal(typeof entity[`offer`][`checkout`], `string`);
      assert.notEqual(checkoutFieldValues.indexOf(entity[`offer`][`checkout`]), -1, `Значение поля "offer.checkout" отсутствует в списке ["${checkoutFieldValues.join(`","`)}"]`);
    });
    it(`Существует поле "offer.features" типа "array" содержащее неповторяющиеся элементы типа "string", содержащихся в списке ["${featuresFieldValues.join(`","`)}"]`, () => {
      assert(entity[`offer`].hasOwnProperty(`features`), `Поле "offer.features" отсутствует`);
      assert(Array.isArray(entity[`offer`][`features`]), `Поле "offer.features" не типа "array"`);
      assert(entity[`offer`][`features`].length > 0, `Поле "offer.features" содержит пустой массив`);
      assert(entity[`offer`][`features`].every(checkTypesOfArrayElements), `Не все элементы "offer.features" имеют тип "string"]`);
      assert(entity[`offer`][`features`].every(checkOccurrencesOfArrayElements), `Не все элементы "offer.features" присутствуют в списке ["${featuresFieldValues.join(`","`)}"]`);
      assert(!hasDuplicateElements(entity[`offer`][`features`]), `Элементы массива "offer.features" дублируются`);
    });
    it(`Существует поле "offer.description" и содержит пустую строку`, () => {
      assert(entity[`offer`].hasOwnProperty(`description`), `Поле "offer.description" отсутствует`);
      assert.equal(typeof entity[`offer`][`description`], `string`);
      assert.equal(entity[`offer`][`description`], ``, `Поле "offer.description" не является пустой строкой`);
    });
    it(`Существует поле "offer.photos" типа "array" содержащее все элементы типа "string", содержащихся в списке ["${photosFieldValues.join(`","`)}"]`, () => {
      assert(entity[`offer`].hasOwnProperty(`photos`), `Поле "offer.photos" отсутствует`);
      assert(Array.isArray(entity[`offer`][`photos`]), `Поле "offer.photos" не типа "array"`);
      assert(entity[`offer`][`photos`].length > 0, `Поле "offer.photos" содержит пустой массив`);
      assert(entity[`offer`][`photos`].every(checkTypesOfArrayElements), `Не все элементы "offer.features" имеют тип "string"]`);
      assert.deepEqual(entity[`offer`][`photos`].sort(), photosFieldValues, `Массив "offer.photos" содержит значения не соответсвующие списку ["${photosFieldValues.join(`","`)}"]`);
    });
  });
  describe(`Правила для поля "location"`, () => {
    it(`Существует поле "location" типа "object"`, () => {
      assert(entity.hasOwnProperty(`location`), `Поле "location" отсутствует`);
      assert.equal(typeof entity[`location`], `object`);
      assert.notEqual(entity[`location`], null, `Поле "location" имеет значние null`);
    });
    it(`Существует поле "location.x" типа "number" от ${conditions.location.x.min} до ${conditions.location.x.max}`, () => {
      assert(entity[`location`].hasOwnProperty(`x`), `Поле "location.x" отсутствует`);
      assert.equal(typeof entity[`location`][`x`], `number`);
      assert(entity[`location`][`x`] >= conditions.location.x.min, `Значение поля "location.x" меньше ${conditions.location.x.min}`);
      assert(entity[`location`][`x`] <= conditions.location.x.max, `Значение поля "location.x" больше ${conditions.location.x.max}`);
    });
    it(`Существует поле "location.y" типа "number" от ${conditions.location.y.min} до ${conditions.location.y.max}`, () => {
      assert(entity[`location`].hasOwnProperty(`y`), `Поле "location.y" отсутствует`);
      assert.equal(typeof entity[`location`][`y`], `number`);
      assert(entity[`location`][`y`] >= conditions.location.y.min, `Значение поля "location.y" меньше ${conditions.location.y.min}`);
      assert(entity[`location`][`y`] <= conditions.location.y.max, `Значение поля "location.y" больше ${conditions.location.y.max}`);
    });
  });
  describe(`Правила для поля "date"`, () => {
    it(`Существует поле "date" типа "number" от сейчас минус ${conditions.date.daysBack} дней в формате UNIX`, () => {
      assert(entity.hasOwnProperty(`date`), `Поле "date" отстутвует`);
      assert.equal(typeof entity[`date`], `number`);
      assert.equal(entity[`date`], Math.floor(entity[`date`]), `Поле "date" должно быть целочисленным`);
      assert(entity[`date`] > (new Date().setHours(0, 0, 0, 0) / 1000 - conditions.date.dayUNIX * conditions.date.daysBack), `Значение поля "date" меньше чем ${conditions.date.daysBack} дней назад`);
      assert(entity[`date`] < (new Date().setHours(0, 0, 0, 0) / 1000), `Значение поля "date" больше чем сейчас`);
    });
  });
});

describe(`Создание и перезапись файлов`, () => {
  it(`Должна выдаваться ошибка при неудачной записи данных`, () => {
    const testFileName = `folder/testfile.json`;
    return generateToFile.execute(testFileName, 1)
      .then(() => assert.fail(`Путь ${testFileName} должен быть недоступен!`))
      .catch((err) => assert.ok(err));
  });

  it(`Должен создаваться новый файл`, () => {
    const testFileName = `testfile.json`;
    return generateToFile.execute(testFileName, 1)
      .then(fsaccess(testFileName))
      .then(fsunlink(testFileName))
      .catch((err) => assert.fail(err.message));
  });

});
