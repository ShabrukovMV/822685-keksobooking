'use strict';

module.exports = class InvalidParamError extends Error {
  constructor(message) {
    super(message);
    this.code = 400;
  }
};
