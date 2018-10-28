'use strict';

const offerGenereator = require(`../generator/offers-generator`);

class OfferStoreMock {
  constructor(data) {
    this.data = data;
  }

  async getOfferByDate(date) {
    return this.data.filter((item) => item.date === date)[0];
  }

  async getOffersBySkipAndLimit(skip, limit) {
    return this.data.slice(skip, skip + limit);
  }

  putOffer() {
    return {
      insertedId: 123,
    };
  }
}

module.exports = new OfferStoreMock(offerGenereator());
