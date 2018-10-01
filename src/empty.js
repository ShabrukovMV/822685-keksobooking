'use strict';

const help = require(`./help`);

module.exports = {
  name: `empty`,
  description: `Печатает предупреждение, что команда не задана.`,
  execute() {
    console.log(`Команда не задана.`);
    help.execute();
  },
};
