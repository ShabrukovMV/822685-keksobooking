'use strict';

require(`colors`);

const commandHandler = require(`./src/load-commands`);
const wrong = require(`./src/wrong`);
const empty = require(`./src/empty`);

const availableCommands = Object.keys(commandHandler);

//   Получаем аргумент для нашего скрипта, undefined - если параметр не задан
const argument = process.argv[2];

//  Получаем индекс команды среди возможных комманд
const commandIndex = availableCommands.indexOf(argument);

if (argument) {
  if (commandIndex >= 0) {
    const command = availableCommands[commandIndex];
    // Запуск обработчика
    commandHandler[command]();
  } else {
    wrong.execute(argument);
    process.exit(1);
  }
} else {
  empty.execute();
}
