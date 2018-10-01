'use strict';

const author = require(`./author`);
const version = require(`./version`);
const description = require(`./description`);
const license = require(`./license`);

module.exports = {
  name: `help`,
  description: `Печатает список доступных команд.`,
  execute() {
    console.log(`Доступные команды:
--help — список доступных команд.      
--${author.name} — ${author.description}
--${description.name} — ${description.description}
--${license.name} — ${license.description}
--${version.name} — ${version.description}`);
  },
};
