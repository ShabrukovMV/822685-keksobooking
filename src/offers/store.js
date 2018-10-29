'use strict';

const logger = require(`../logger`);
const dBase = require(`../database/db`);

class OfferStore {
  constructor() {
    this.collection = 0;
  }

  async _collection() {
    if (this.collection !== 0) {
      return this.collection;
    }
    try {
      const db = await dBase.open();
      this.collection = db.collection(`offers`);
      this.collection.createIndex({date: 1});
    } catch (e) {
      logger.error(`Не удалось настроить коллекцию offers`, e.message);
    }
    return this.collection;
  }

  async getOfferByDate(date) {
    return (await this._collection()).findOne({date});
  }

  async getOffersBySkipAndLimit(skip, limit) {
    return (await this._collection()).find().skip(skip).limit(limit).toArray();
  }

  async putOffer(offerData) {
    return (await this._collection()).insertOne(offerData);
  }

  async putManyOffers(offerDataArray) {
    return (await this._collection()).insertMany(offerDataArray);
  }

}

module.exports = new OfferStore();
