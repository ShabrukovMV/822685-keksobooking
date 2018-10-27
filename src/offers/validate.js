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

function validateObject(path, schemeObj, testingObj) {
  const checks = new ValidationMethods();
  let errors = [];

  for (let i = 0; i < Object.keys(schemeObj).length; i++) {
    let key = Object.keys(schemeObj)[i];
    if (checkProperty(testingObj, key)) {
      if (checkTypeOf(testingObj[key], schemeObj[key].typeOf)) {

        if (typeof schemeObj[key] === `object` && schemeObj[key].typeOf === `object`) {
          validateObject(`${path}.${key}`, schemeObj[key][`properties`], testingObj[key]);
        } else {
          checks.setCheckingValue = testingObj[key];
          schemeObj[key].checks.forEach((item) => {
            if (!checks[item.checkMethod](...item.args)) {
              errors.push(makeErrorMessage(key, item.errmsg ? item.errmsg : `Проверка не пройдена, описания нет!`));
            }
          });
        }

      } else {
        errors.push(makeErrorMessage(key, `Поле "${`${path}.${key}`.slice(1)}" должно быть типа "${schemeObj[key].typeOf}"`));
      }
    } else {
      if (schemeObj[key].isRequired) {
        errors.push(makeErrorMessage(key, `Поле "${`${path}.${key}`.slice(1)}" отсутствует!`));
      }
    }
  }

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  return testingObj;
}

module.exports = (schemeOffer, data) => {
  return validateObject(``, schemeOffer, data);
};
