'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `license`,
  description: `Печатает лицензию программы.`,
  execute() {
    console.log(`Лицензия: ${packageInfo.license.bgRed.bold.white}`);
  }
};
