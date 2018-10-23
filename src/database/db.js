'use strict';

const {MongoClient} = require(`mongodb`);

const {
  DB_HOST = `localhost:27017`,
  DB_PATH = `keksobooking`,
} = process.env;

const url = `mongodb://${DB_HOST}`;

module.exports = MongoClient.connect(url).then((client) => client.db(DB_PATH)).catch((e) => {
  console.error(`Не могу соединиться с MongoDB, ошибка: `, e.message);
  process.exit(1);
});
