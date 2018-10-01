'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `description`,
  description: `Печатает описание программы.`,
  execute() {
    console.log(`Описание: ${packageInfo.description.yellow}`);
  }
};
