'use strict';

const help = require(`./help`);

module.exports = {
  name: `wrong`,
  description: `Печатает предупреждение о неизвестной команде.`,
  execute(argument) {
    console.log(`Неизвестная команда { ${argument ? argument : ``} }`);
    help.execute();
  },
};
