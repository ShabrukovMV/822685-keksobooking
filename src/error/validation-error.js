'use strict';

module.exports = class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.code = 400;
    this.errors = message;
  }
};
