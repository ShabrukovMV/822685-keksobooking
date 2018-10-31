"use strict";

const ValidationError = require(`../error/validation-error`);
const ValidationMethods = require(`./validation-methods`);

const checkProperty = (item, property) => {
  return (typeof item === `object` && item.hasOwnProperty(property));
};

const checkTypeOf = (item, type) => {
  if (type === `number` && parseInt(item, 10)) {
    return true;
  }
  return (typeof item === `object` && Array.isArray(item) ? `array` : typeof item) === type;
};

const makeErrorMessage = (key, message) => {
  return {error: `Validation Error`, fieldName: key, errorMessage: message};
};

const validateObject = (path, scheme, testingData) => {
  const check = new ValidationMethods();
  const errors = [];

  for (const key of Object.keys(scheme)) {
    if (checkProperty(testingData, key)) {
      if (checkTypeOf(testingData[key], scheme[key].typeOf)) {

        if (typeof scheme[key] === `object` && scheme[key].typeOf === `object`) {
          validateObject(`${path}.${key}`, scheme[key][`properties`], testingData[key]);
        } else {
          check.setCheckingValue = testingData[key];
          scheme[key].checks.forEach((item) => {
            if (!check[item.checkMethod](...item.args)) {
              errors.push(makeErrorMessage(key, item.errmsg ? item.errmsg : `Проверка не пройдена, описания нет!`));
            }
          });
        }

      } else {
        errors.push(makeErrorMessage(key, `Поле "${`${path}.${key}`.slice(1)}" должно быть типа "${scheme[key].typeOf}"`));
      }
    } else {
      if (scheme[key].isRequired) {
        errors.push(makeErrorMessage(key, `Поле "${`${path}.${key}`.slice(1)}" отсутствует!`));
      }
    }
  }

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  return testingData;
};

module.exports = (schemeOffer, data) => {
  return validateObject(``, schemeOffer, data);
};
