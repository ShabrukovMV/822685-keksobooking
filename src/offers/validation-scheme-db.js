'use strict';

const conditions = require(`../../test/generator/generate-conditions`);

const typeFieldValues = conditions.offer.type.values;
const featuresFieldValues = conditions.offer.features.values;

module.exports =
  {
    author: {
      typeOf: `object`,
      isRequired: true,
      properties: {
        avatar: {
          typeOf: `string`,
          checks: [],
        },
        name: {
          typeOf: `string`,
          checks: [],
        },
      },
    },
    offer: {
      typeOf: `object`,
      isRequired: true,
      properties: {
        title: {
          typeOf: `string`,
          isRequired: true,
          checks: [{
            checkMethod: `checkLengthString`,
            args: [30, 140],
            errmsg: `Длина строки "offer.title не попадает в интервал [30..140]"`,
          }],
        },
        type: {
          typeOf: `string`,
          isRequired: true,
          checks: [{
            checkMethod: `checkElement`,
            args: [typeFieldValues],
            errmsg: `Значение поля "offer.type" отсутствует в списке ["${typeFieldValues.join(`","`)}"]`,
          }],
        },
        price: {
          typeOf: `number`,
          isRequired: true,
          checks: [{
            checkMethod: `checkInterval`,
            args: [1, 100000],
            errmsg: `Значение поля "offer.price" не попадает в интервал [1..100000]`,
          }],
        },
        address: {
          typeOf: `string`,
          isRequired: true,
          checks: [
            {
              checkMethod: `checkLengthString`,
              args: [0, 100],
              errmsg: `Длина строки поля "offer.address" не попадает в интервал [0..100]`,
            },
            {
              checkMethod: `checkRegExp`,
              args: [/^\d+.+,.+\d+$/],
              errmsg: `Поле "offer.address" не формата "x,y"`,
            }],
        },
        checkin: {
          typeOf: `string`,
          isRequired: true,
          checks: [{
            checkMethod: `checkRegExp`,
            args: [/^([01][0-9]|2[0-3]):([0-5][0-9])$/],
            errmsg: `Значение поля "offer.checkin" не соответствует формату [HH:mm]`,
          }],
        },
        checkout: {
          typeOf: `string`,
          isRequired: true,
          checks: [{
            checkMethod: `checkRegExp`,
            args: [/^([01][0-9]|2[0-3]):([0-5][0-9])$/],
            errmsg: `Значение поля "offer.checkout" не соответствует формату [HH:mm]`,
          }],
        },
        rooms: {
          typeOf: `number`,
          isRequired: true,
          checks: [{
            checkMethod: `checkInterval`,
            args: [0, 1000],
            errmsg: `Значение поля "offer.rooms" не в интервале [0..1000]`,
          }],
        },
        features: {
          typeOf: `array`,
          checks: [
            {
              checkMethod: `checkNotValue`,
              args: [[]],
              errmsg: `Массив "offer.features" не должен быть пустым`,
            },
            {
              checkMethod: `checkTypesElements`,
              args: [],
              errmsg: `Не все элементы "offer.features" имеют тип "string"`,
            },
            {
              checkMethod: `checkIncludedElements`,
              args: [featuresFieldValues],
              errmsg: `Не все элементы "offer.features" присутствуют в списке ["${featuresFieldValues.join(`","`)}"]`,
            },
            {
              checkMethod: `checkDuplicateElements`,
              args: [],
              errmsg: `Элементы массива "offer.features" не должны дублироваться`,
            },
          ],
        },
        preview: {
          typeOf: `string`,
          isRequired: false,
          checks: [],
        },
      },
    },
    location: {
      typeOf: `object`,
      isRequired: true,
      properties: {
        x: {
          typeOf: `number`,
          checks: [
            {
              checkMethod: `checkInterval`,
              args: [conditions.location.x.min, conditions.location.x.max],
              errmsg: `Значение поля "location.x" не попадает в интервал [${conditions.location.x.min}..${conditions.location.x.max}]`,
            }],
        },
        y: {
          typeOf: `number`,
          checks: [{
            checkMethod: `checkInterval`,
            args: [conditions.location.y.min, conditions.location.y.max],
            errmsg: `Значение поля "location.y" не попадает в интервал [${conditions.location.y.min}..${conditions.location.y.max}]`,
          }],
        },
      },
    },
    date: {
      typeOf: `number`,
      isRequired: true,
      checks: [
        {checkMethod: `checkInteger`, args: [], errmsg: `Поле "date" должно быть целочисленным`},
        {
          checkMethod: `checkInterval`,
          args: [new Date().setUTCHours(0, 0, 0, 0) / 1000 - conditions.date.dayUNIX * conditions.date.daysBack, new Date().setUTCHours(23, 59, 59, 999) / 1000],
          errmsg: `Значение поля date не попадает в интервал [${new Date().setUTCHours(0, 0, 0, 0) / 1000 - conditions.date.dayUNIX * conditions.date.daysBack}..${new Date().setUTCHours(0, 0, 0, 0) / 1000}]`,
        }],
    },
  };
