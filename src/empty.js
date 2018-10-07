'use strict';

const readline = require(`readline`);
const author = require(`./author`);
const generateToFile = require(`./generate-to-file`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const fsstat = promisify(fs.stat);

module.exports = {
  name: `empty`,
  description: `Печатает приветствие пользователю и предлагает сгенерировать данные`,
  execute() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    let stage = `askgendata`;
    let numberElements;
    let fileName;

    console.log(`Привет пользователь!
Эта программа будет запускать сервер ${`«keksobooking»`.green.bold}`);
    author.execute();

    rl.setPrompt(`Хотите сгенерировать данные? ${`(y/n)`.green.bold} `);
    rl.prompt();

    rl.on(`line`, (line) => {
      switch (stage) {
        case `askgendata`:
          if (line === `y`) {
            stage = `asknumdata`;
            rl.setPrompt(`Какоe количество элементов нужно сгенерировать? ${`(1..10)`.green.bold} `);
          } else if (line === `n`) {
            rl.close();
          }
          rl.prompt();
          break;
        case `asknumdata`:
          numberElements = line * 1;
          if (numberElements >= 1 && numberElements <= 10) {
            stage = `askfilename`;
            rl.setPrompt(`Задайте путь до файла в котором необходимо сохранить данные: `);
          } else if (numberElements === 0) {
            console.log(`Вы задали нулевое кол-во элементов!`);
            rl.close();
          }
          rl.prompt();
          break;
        case `askfilename`:
          fileName = line;
          fsstat(fileName)
            .then((stats) => {
              if (stats.isDirectory()) {
                console.log(`Ошибка: путь ${fileName} является папкой!`);
              }
              if (stats.isFile()) {
                stage = `filexists`;
                rl.setPrompt(`Такой файл (${fileName}) уже существует, перезаписать данные? ${`(y/n) `.green.bold} `);
              }
              rl.prompt();
            })
            .catch(() => {
              generateToFile.execute(fileName, numberElements)
                .then(() => {
                  console.log(`Данные сгенерированы успешно!`);
                  rl.close();
                })
                .catch((errGenerateToFile) => {
                  console.log(`Ошибка записи файла: ${errGenerateToFile.code}`);
                  rl.prompt();
                });
            });
          break;
        case `filexists`:
          if (line === `y`) {
            generateToFile.execute(fileName, numberElements)
              .then(() => {
                console.log(`Данные успешно сгенерированы и перезаписаны!`);
                rl.close();
              })
              .catch((err) => {
                console.log(`Ошибка записи файла: ${err.code}`);
                rl.prompt();
              });
          } else if (line === `n`) {
            console.log(`Вы отказались от перезапии данных!`);
            rl.close();
          } else {
            rl.prompt();
          }
          break;
        default:
          console.log(`Неизвестная стадия сценария!`);
      }
    }).on(`close`, () => {
      console.log(`Всего хорошего!`);
      process.exit(0);
    }).on(`error`, () => {
      console.log(`Ошибка!`);
      process.exit(1);
    });
  }
  ,
};
