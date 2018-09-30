'use strict';

const author = require(`./author`);
const version = require(`./version`);
const description = require(`./description`);
const license = require(`./license`);

const argument = process.argv[2];

switch (argument) {
  case `--author`:
    author.execute();
    break;
  case `--description`:
    description.execute();
    break;
  case `--license`:
    license.execute();
    break;
  case `--version`:
    version.execute();
    break;
  default:
    console.log(`Неизвестная команда { ${argument ? argument : ``} }
Доступные команды:
--${author.name} — ${author.description}
--${description.name} — ${description.description}
--${license.name} — ${license.description}
--${version.name} — ${version.description}`);
    process.exit(1);
}
