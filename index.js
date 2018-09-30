'use strict';

const emptyText = `Привет пользователь!\n` +
  `Эта программа будет запускать сервер «keksobooking».\n` +
  `Автор: Шабруков М.В.`;
const wrongText = `Неизвестная команда { ?? }.\n` +
  `Чтобы прочитать правила использования приложения, наберите "--help"`;
const versionText = `v0.0.1`;
const helpText = `Доступные команды:\n` +
  `--help    — печатает этот текст;\n` +
  `--version — печатает версию приложения;`;

const availableCommands = [`--version`, `--help`];

//   Получаем аргумент для нашего скрипта, undefined - если параметр не задан
const argument = process.argv[2];
//  Получаем индекс команды среди возможных комманд
const commandIndex = availableCommands.indexOf(argument);
//  Определяем обработчик действий
const actionHandler = {
  'empty': () => {
    console.log(emptyText);
  },
  'wrong': (param) => {
    console.error(wrongText.replace(`??`, param));
    process.exit(1);
  },
  '--version': () => {
    console.log(versionText);
  },
  '--help': () => {
    console.log(helpText);
  },
};
//  Рассчитываем вариант действия
//  'wrong' - неверная команда, 'empty' - нет аргумента, иначе - возможная обрабатываемая команда
let action;
if (argument) {
  if (commandIndex < 0) {
    action = `wrong`;
  } else {
    action = availableCommands[commandIndex];
  }
} else {
  action = `empty`;
}
//  Запуск обработчика
actionHandler[action](argument);
