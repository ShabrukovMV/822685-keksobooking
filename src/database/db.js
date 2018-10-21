'use strict';

const {MongoClient} = require(`mongodb`);

const url = `mongodb://localhost:27017`;

module.exports = MongoClient.connect(url).then((client) => client.db(`keksobooking`)).catch((e) => {
  console.error(`Не могу соединиться с MongoDB, ошибка: `, e.message);
  process.exit(1);
});
