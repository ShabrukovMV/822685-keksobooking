'use strict';

const commandHandler = require(`./src/load-commands`);

const availableCommands = [`--version`, `--help`, `--author`, `--description`, `--license`];

//   Получаем аргумент для нашего скрипта, undefined - если параметр не задан
const argument = process.argv[2];

//  Получаем индекс команды среди возможных комманд
const commandIndex = availableCommands.indexOf(argument);

//  Рассчитываем вариант действия
//  'wrong' - неверная команда, 'empty' - нет аргумента, иначе - возможная обрабатываемая команда
let command;
if (argument) {
  if (commandIndex < 0) {
    command = `wrong`;
  } else {
    command = availableCommands[commandIndex];
  }
} else {
  command = `empty`;
}
//  Запуск обработчика
commandHandler[command](argument);
