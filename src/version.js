'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `Печатает версию программы.`,
  execute() {
    console.log(`Версия: ${packageInfo.version}`);
  }
};
