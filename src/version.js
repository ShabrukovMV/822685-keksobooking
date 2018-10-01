'use strict';

const packageInfo = require(`../package.json`);

const versionColors = [`red`, `green`, `blue`];
const versionNumbers = packageInfo.version.split(`.`);
versionNumbers.forEach((item, index, array) => {
  array[index] = `${item[versionColors[index]]}`;
});
const colorVersion = `${versionNumbers}`.replace(/,/g, `.`);

module.exports = {
  name: `version`,
  description: `Печатает версию программы.`,
  execute() {
    console.log(`Версия: ${colorVersion}`);
  },
};
