'use strict';

const author = require(`./author`);
const version = require(`./version`);
const description = require(`./description`);
const license = require(`./license`);
const server = require(`./server`);

module.exports = {
  name: `help`,
  description: `Печатает список доступных команд.`,
  execute() {
    console.log(`Доступные команды:
${`--help`.grey} — ${`Печатает список доступных команд.`.green}      
${`--${author.name}`.grey} — ${author.description.green}
${`--${description.name}`.grey} — ${description.description.green}
${`--${license.name}`.grey} — ${license.description.green}
${`--${version.name}`.grey} — ${version.description.green}
${`--${server.name}`.grey} — ${server.description.green}`);
  },
};
