'use strict';

const conditions = require(`../../test/generator/generate-conditions`);

const titleFieldValues = conditions.offer.title.values;
const typeFieldValues = conditions.offer.type.values;
const checkinFieldValues = conditions.offer.checkin.values;
const checkoutFieldValues = conditions.offer.checkout.values;
const featuresFieldValues = conditions.offer.features.values;
const photosFieldValues = conditions.offer.photos.values.sort();

module.exports =
  {
    author: {
      typeOf: `object`,
      isRequired: true,
      properties: {
        avatar: {
          typeOf: `string`,
          isRequired: true,
          checks: [],
        },
      },
    },
    offer: {
      typeOf: `object`,
      properties: {
        title: {
          typeOf: `string`,
          isRequired: true,
          checks: [{
            checkMethod: `checkElement`,
            args: [titleFieldValues],
            errmsg: `Значение поля "offer.title" отсутствует в списке ["${titleFieldValues.join(`","`)}"]`,
          }],
        },
        address: {
          typeOf: `string`,
          checks: [{checkMethod: `checkRegExp`, args: [/^\d+,\d+$/], errmsg: `Поле "offer.address" не формата "x,y"`}],
        },
        price: {
          typeOf: `number`,
          checks: [{
            checkMethod: `checkInterval`,
            args: [conditions.offer.price.min, conditions.offer.price.max],
            errmsg: `Значение поля "offer.price" не в интервале [${conditions.offer.price.min}..${conditions.offer.price.max}]`,
          }],
        },
        type: {
          typeOf: `string`,
          checks: [{
            checkMethod: `checkElement`,
            args: [typeFieldValues],
            errmsg: `Значение поля "offer.type" отсутствует в списке ["${typeFieldValues.join(`","`)}"]`,
          }],
        },
        rooms: {
          typeOf: `number`,
          checks: [{
            checkMethod: `checkInterval`,
            args: [conditions.offer.rooms.min, conditions.offer.rooms.max],
            errmsg: `Значение поля "offer.rooms" не в интервале [${conditions.offer.rooms.min}..${conditions.offer.rooms.max}]`,
          }],
        },
        guests: {
          typeOf: `number`,
          checks: [{
            checkMethod: `checkGreaterThen`,
            args: [conditions.offer.guests.min],
            errmsg: `Значение поля "offer.guests" меньше ${conditions.offer.guests.min}`,
          }],
        },
        checkin: {
          typeOf: `string`,
          checks: [{
            checkMethod: `checkElement`,
            args: [checkinFieldValues],
            errmsg: `Значение поля "offer.checkin" отсутствует в списке ["${checkinFieldValues.join(`","`)}"]`,
          }],
        },
        checkout: {
          typeOf: `string`,
          checks: [{
            checkMethod: `checkElement`,
            args: [checkoutFieldValues],
            errmsg: `Значение поля "offer.checkout" отсутствует в списке ["${checkoutFieldValues.join(`","`)}"]`,
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
        description: {
          typeOf: `string`,
          checks: [{checkMethod: `checkValue`, args: [``], errmsg: `Значение поля должно быть пустой строкой`}],
        },
        photos: {
          typeOf: `array`,
          checks: [
            {
              checkMethod: `checkNotValue`,
              args: [[]],
              errmsg: `Массив "offer.photos" не должен быть пустым`,
            },
            {
              checkMethod: `checkTypesElements`,
              args: [`string`],
              errmsg: `Не все элементы "offer.photos" имеют тип "string"`,
            },
            {
              checkMethod: `checkIncludedElements`,
              args: [photosFieldValues],
              errmsg: `Массив "offer.photos" содержит значения не соответствующие списку ["${photosFieldValues.join(`","`)}"]`,
            },
            {
              checkMethod: `checkDuplicateElements`,
              args: [photosFieldValues],
              errmsg: `Массив "offer.photos" содержит дублирующиеся значения`,
            },
            {
              checkMethod: `checkValue`,
              args: [photosFieldValues],
              errmsg: `Массив "offer.photos" не соответствует эталону`,
            },
          ],
        },
      },
    },
    location: {
      typeOf: `object`,
      properties: {
        x: {
          typeOf: `number`,
          checks: [
            {
              checkMethod: `checkInterval`,
              args: [conditions.location.x.min, conditions.location.x.max],
              errmsg: `Значение поля "location.x" должно быть в интервале [${conditions.location.x.min}..${conditions.location.x.max}]`,
            }],
        },
        y: {
          typeOf: `number`,
          checks: [{
            checkMethod: `checkInterval`,
            args: [conditions.location.y.min, conditions.location.y.max],
            errmsg: `Значение поля "location.y" должно быть в интервале [${conditions.location.y.min}..${conditions.location.y.max}]`,
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
          args: [new Date().setUTCHours(0, 0, 0, 0) / 1000 - conditions.date.dayUNIX * conditions.date.daysBack, new Date().setUTCHours(0, 0, 0, 0) / 1000],
          errmsg: `Дата должна быть в интервале [${new Date().setUTCHours(0, 0, 0, 0) / 1000 - conditions.date.dayUNIX * conditions.date.daysBack}..${new Date().setUTCHours(0, 0, 0, 0) / 1000}]`,
        }],
    },
  };
