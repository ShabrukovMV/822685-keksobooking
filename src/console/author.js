'use strict';

const packageInfo = require(`../../package`);

module.exports = {
  name: `author`,
  description: `Печатает имя автора программы.`,
  execute() {
    console.log(`Автор: ${packageInfo.author.bold.yellow}`);
  }
};
