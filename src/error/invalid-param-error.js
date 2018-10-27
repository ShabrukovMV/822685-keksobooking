'use strict';

module.exports = class InvalidParamError extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.code = 400;
    this.error = [{error: `Inavlid Parameter Error`, errorMessage}];
  }
};
