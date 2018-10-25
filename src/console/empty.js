'use strict';

const readline = require(`readline`);
const author = require(`./author`);
const packageInfo = require(`../../package`);
const ReadLineStages = require(`./read-line-stages`);

module.exports = {
  name: `empty`,
  description: `Печатает приветствие пользователю и предлагает сгенерировать данные`,
  execute() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    console.log(`Привет пользователь!
Эта программа будет запускать сервер «${packageInfo.name.green.bold}»`);
    author.execute();

    const stageHandler = new ReadLineStages(rl);

    rl.on(`line`, (line) => stageHandler.execute(line))
      .on(`close`, () => {
        console.log(`Всего хорошего!`);
        process.exit();
      })
      .on(`error`, () => {
        console.log(`Ошибка!`);
        process.exit(1);
      });
  },
};
