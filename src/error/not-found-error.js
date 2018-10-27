'use strict';

module.exports = class NotFoundError extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    this.code = 404;
    this.error = [{error: `Not Found Error`, errorMessage}];
  }
};
