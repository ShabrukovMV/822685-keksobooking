'use strict';

const ValidationError = require(`../error/validation-error`);
const conditions = require(`../generate-conditions`);

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

module.exports = (data) => {
  const errors = [];
  if (typeof data !== `object`) {
    errors.push(`Данные должны быть объектом`);
  } else {
    if (!data.hasOwnProperty(`author`)) {
      errors.push(`Поле 'author' отсутствует`);
    } else {
      if (typeof data.author !== `object`) {
        errors.push(`Поле 'author' должно быть 'object'`);
      } else if (!data.author.hasOwnProperty(`avatar`)) {
        errors.push(`Поле 'author.avatar' отсутсвует`);
      } else if (typeof data.author.avatar !== `string`) {
        errors.push(`Поле 'author.avatar' должно быть 'string'`);
      }
    }

    if (!data.hasOwnProperty(`offer`)) {
      errors.push(`Поле 'offer' отсутствует`);
    } else {
      if (typeof data.offer !== `object`) {
        errors.push(`Поле 'offer' должно быть 'object'`);
      } else {
        if (!data.offer.hasOwnProperty(`title`)) {
          errors.push(`Поле 'offer.title' отсутствует`);
        } else {
          if (typeof data[`offer`][`title`] !== `string`) {
            errors.push(`Поле 'offer.title'  должно быть 'string'`);
          } else if (titleFieldValues.indexOf(data.offer.title) === -1) {
            errors.push(`Значение поля 'offer.title' отсутствует в списке ['${titleFieldValues.join(`','`)}']`);
          }
        }

        if (!data.offer.hasOwnProperty(`address`)) {
          errors.push(`Поле 'offer.address' отсутствует`);
        } else {
          if (typeof data.offer.address !== `string`) {
            errors.push(`Поле 'offer.address'  должно быть 'string'`);
          } else if (data.offer.address.search(/^\d+,\d+$/) === -1) {
            errors.push(`Поле 'offer.address' не формата 'x,y'`);
          }
        }

        if (!data.offer.hasOwnProperty(`price`)) {
          errors.push(`Поле 'offer.price' отсутствует`);
        } else {
          if (typeof data.offer.price !== `number`) {
            errors.push(`Поле 'offer.price' должно быть 'number'`);
          } else {
            if (data.offer.price < conditions.offer.price.min) {
              errors.push(`Значение поля 'offer.price' меньше ${conditions.offer.price.min}`);
            }
            if (data.offer.price > conditions.offer.price.max) {
              errors.push(`Значение поля 'offer.price' больше ${conditions.offer.price.max}`);
            }
          }
        }

        if (!data.offer.hasOwnProperty(`type`)) {
          errors.push(`Поле 'offer.type' отсутствует`);
        } else {
          if (typeof data.offer.type !== `string`) {
            errors.push(`Поле 'offer.type' должно быть 'string'`);
          } else {
            if (typeFieldValues.indexOf(data.offer.type) < 0) {
              errors.push(`Значение поля 'offer.type' отсутствует в списке ['${typeFieldValues.join(`','`)}']`);
            }
          }
        }

        if (!data.offer.hasOwnProperty(`rooms`)) {
          errors.push(`Поле 'offer.rooms' отсутствует`);
        } else {
          if (typeof data.offer.rooms !== `number`) {
            errors.push(`Поле 'offer.rooms' должно быть 'number'`);
          } else {
            if (data.offer.rooms < conditions.offer.rooms.min) {
              errors.push(`Значение поля 'offer.rooms' меньше ${conditions.offer.rooms.min}`);
            }
            if (data.offer.rooms > conditions.offer.rooms.max) {
              errors.push(`Значение поля 'offer.rooms' больше ${conditions.offer.rooms.max}`);
            }
          }
        }

        if (!data.offer.hasOwnProperty(`guests`)) {
          errors.push(`Поле 'offer.guests' отсутствует`);
        } else {
          if (typeof data.offer.guests !== `number`) {
            errors.push(`Поле 'offer.guests' должно быть 'number'`);
          } else {
            if (data.offer.guests < conditions.offer.guests.min) {
              errors.push(`Значение поля 'offer.guests' меньше ${conditions.offer.guests.min}`);
            }
          }
        }

        if (!data.offer.hasOwnProperty(`checkin`)) {
          errors.push(`Поле 'offer.checkin' отсутствует`);
        } else {
          if (typeof data.offer.checkin !== `string`) {
            errors.push(`Поле 'offer.checkin' должно быть 'string'`);
          } else {
            if (checkinFieldValues.indexOf(data.offer.checkin) < 0) {
              errors.push(`Значение поля 'offer.checkin' отсутствует в списке ['${checkinFieldValues.join(`','`)}']`);
            }
          }
        }

        if (!data.offer.hasOwnProperty(`checkout`)) {
          errors.push(`Поле 'offer.checkout' отсутствует`);
        } else {
          if (typeof data.offer.checkout !== `string`) {
            errors.push(`Поле 'offer.checkout' должно быть 'string'`);
          } else {
            if (checkoutFieldValues.indexOf(data.offer.checkout) < 0) {
              errors.push(`Значение поля 'offer.checkout' отсутствует в списке ['${checkoutFieldValues.join(`','`)}']`);
            }
          }
        }

        if (!data.offer.hasOwnProperty(`features`)) {
          errors.push(`Поле 'offer.features' отсутствует`);
        } else {
          if (!Array.isArray(data.offer.features)) {
            errors.push(`Поле 'offer.features' не типа 'array'`);
          } else {
            if (data[`offer`][`features`].length === 0) {
              errors.push(`Поле 'offer.features' содержит пустой массив`);
            } else if (!data.offer.features.every(checkTypesOfArrayElements)) {
              errors.push(`Не все элементы 'offer.features' имеют тип 'string']`);
            } else if (!data.offer.features.every(checkOccurrencesOfArrayElements)) {
              errors.push(`Не все элементы 'offer.features' присутствуют в списке ['${featuresFieldValues.join(`','`)}']`);
            } else if (hasDuplicateElements(data.offer.features)) {
              errors.push(`Элементы массива 'offer.features' не должны дублироваться`);
            }
          }
        }

        if (!data.offer.hasOwnProperty(`description`)) {
          errors.push(`Поле 'offer.description' отсутствует`);
        } else {
          if (typeof data.offer.description !== `string`) {
            errors.push(`Поле 'offer.description'  должно быть 'string'`);
          } else if (data.offer.description !== ``) {
            errors.push(`Поле 'offer.description' не является пустой строкой`);
          }
        }

        if (!data.offer.hasOwnProperty(`photos`)) {
          errors.push(`Поле 'offer.photos' отсутствует`);
        } else {
          if (!Array.isArray(data.offer.photos)) {
            errors.push(`Поле 'offer.photos' не типа 'array'`);
          } else {
            if (data[`offer`][`photos`].length === 0) {
              errors.push(`Поле 'offer.photos' содержит пустой массив`);
            } else if (!data.offer.photos.every(checkTypesOfArrayElements)) {
              errors.push(`Не все элементы 'offer.photos' имеют тип 'string']`);
            } else if (data.offer.photos.sort().join() !== photosFieldValues.join()) {
              errors.push(`Массив 'offer.photos' содержит значения не соответствующие списку ['${photosFieldValues.join(`','`)}']`);
            }
          }
        }
      }
    }

    if (!data.hasOwnProperty(`location`)) {
      errors.push(`Поле 'location' отсутствует`);
    } else {
      if (typeof data.location !== `object`) {
        errors.push(`Поле 'location' должно быть 'object'`);
      } else {
        if (!data.location.hasOwnProperty(`x`)) {
          errors.push(`Поле 'location.x' отсутствует`);
        } else {
          if (typeof data.location.x !== `number`) {
            errors.push(`Поле 'location.x' должно быть 'number'`);
          } else {
            if (data.location.x < conditions.location.x.min) {
              errors.push(`Значение поля 'location.x' меньше ${conditions.location.x.min}`);
            }
            if (data.location.x > conditions.location.x.max) {
              errors.push(`Значение поля 'location.x' больше ${conditions.location.x.max}`);
            }
          }
        }

        if (!data.location.hasOwnProperty(`y`)) {
          errors.push(`Поле 'location.y' отсутствует`);
        } else {
          if (typeof data.location.y !== `number`) {
            errors.push(`Поле 'location.y' должно быть 'number'`);
          } else {
            if (data.location.y < conditions.location.y.min) {
              errors.push(`Значение поля 'location.y' меньше ${conditions.location.y.min}`);
            }
            if (data.location.y > conditions.location.y.max) {
              errors.push(`Значение поля 'location.y' больше ${conditions.location.y.max}`);
            }
          }
        }
      }
    }

    if (!data.hasOwnProperty(`date`)) {
      errors.push(`Поле 'date' отсутствует`);
    } else {
      if (typeof data.date !== `number`) {
        errors.push(`Поле 'date' должно быть 'number'`);
      } else {
        if (data.date !== Math.floor(data.date)) {
          errors.push(`Поле 'date' должно быть целочисленным`);
        }
        if (data.date < (new Date().setUTCHours(0, 0, 0, 0) / 1000 - conditions.date.dayUNIX * conditions.date.daysBack)) {
          errors.push(`Значение поля 'date' меньше чем ${conditions.date.daysBack} дней назад`);
        }
        if (data.date > (new Date().setUTCHours(0, 0, 0, 0) / 1000)) {
          errors.push(`Значение поля 'date' больше чем сейчас`);
        }
      }
    }
  }

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  return data;
};
