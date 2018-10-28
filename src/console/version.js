'use strict';

const packageInfo = require(`../../package`);

const [majorVersion, minorVersion, patchVersion] = packageInfo.version.split(`.`);
const colorVersion = `${majorVersion.red}.${minorVersion.green}.${patchVersion.blue}`;

module.exports = {
  name: `version`,
  description: `Печатает версию программы.`,
  execute() {
    console.log(`Версия: ${colorVersion}`);
  },
};
