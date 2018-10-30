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
    this.dataBaseInstance = null;
    this.connection = null;
  }

  async open() {
    if (this.dataBaseInstance) {
      return this.dataBaseInstance;
    }
    try {
      this.connection = await MongoClient.connect(url, options);
      this.dataBaseInstance = this.connection.db(DB_PATH);
      return this.dataBaseInstance;
    } catch (e) {
      logger.error(`Не могу соединиться с MongoDB, ошибка: `, e);
      return process.exit(1);
    }
  }

  async close() {
    if (this.dataBaseInstance) {
      await this.connection.close();
      this.dataBaseInstance = null;
    }
  }
}

module.exports = new DataBase();
