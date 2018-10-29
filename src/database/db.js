'use strict';

const {MongoClient} = require(`mongodb`);
const logger = require(`../logger`);

const {
  DB_HOST = `localhost:27017`,
  DB_PATH = `keksobooking`,
} = process.env;

const url = `mongodb://${DB_HOST}`;
const options = {useNewUrlParser: true};

class DataBase {
  constructor() {
    this.dataBaseInstance = 0;
  }

  async open() {
    if (this.dataBaseInstance !== 0) {
      return this.dataBaseInstance;
    }
    try {
      this.dataBaseInstance = await MongoClient.connect(url, options);
      this.dataBaseInstance = this.dataBaseInstance.db(DB_PATH);
      return this.dataBaseInstance;
    } catch (e) {
      logger.error(`Не могу соединиться с MongoDB, ошибка: `, e);
      return process.exit(1);
    }
  }
}

module.exports = new DataBase();
