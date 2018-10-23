'use strict';

const {MongoClient} = require(`mongodb`);
const logger = require(`../logger`);

const {
  DB_HOST = `localhost:27017`,
  DB_PATH = `keksobooking`,
} = process.env;

const url = `mongodb://${DB_HOST}`;
const options = {useNewUrlParser: true};

module.exports = MongoClient.connect(url, options).then((client) => client.db(DB_PATH)).catch((e) => {
  logger.error(`Не могу соединиться с MongoDB, ошибка: `, e.message);
  process.exit(1);
});
