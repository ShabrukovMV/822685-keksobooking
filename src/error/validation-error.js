'use strict';

module.exports = class ValidationError extends Error {
  constructor(errors) {
    super(`Ошибка валидации`);
    this.code = 400;
    this.errors = errors;
  }
};
