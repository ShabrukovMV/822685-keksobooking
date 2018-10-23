'use strict';

require(`colors`);
require(`dotenv`).config();

const commandHandler = require(`./src/load-commands`);
const wrong = require(`./src/wrong`);
const empty = require(`./src/empty`);

const availableCommands = Object.keys(commandHandler);

//   Получаем аргумент для нашего скрипта, undefined - если параметр не задан
const args = process.argv.slice(2);
//  Получаем индекс команды среди возможных комманд
const commandIndex = availableCommands.indexOf(args[0]);

if (args[0]) {
  if (commandIndex >= 0) {
    const command = availableCommands[commandIndex];
    // Запуск обработчика
    commandHandler[command](args[1]);
  } else {
    wrong.execute(args[0]);
    process.exit(1);
  }
} else {
  empty.execute();
}
