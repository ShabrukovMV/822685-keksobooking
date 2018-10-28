'use strict';

const readline = require(`readline`);

const author = require(`./author`);
const packageInfo = require(`../../package`);
const generateEntity = require(`../../test/generator/generate`);

const validate = require(`../offers/validate`);
const validationScheme = require(`../offers/validation-scheme`);

module.exports = {
  name: `fill`,
  description: `Заполняет базу данных тестовыми данными`,
  async execute() {
    const offerStore = require(`../offers/store`);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const question = (query) => {
      return new Promise((resolve, _reject) => {
        rl.question(query, (input) => {
          return resolve(input);
        });
      });
    };

    rl.on(`close`, () => {
      console.log(`Всего хорошего!`);
      process.exit(1);
    });

    console.log(`Привет пользователь!
Эта программа будет запускать сервер «${packageInfo.name.green.bold}»`);
    author.execute();

    let answer;

    do {
      answer = await question(`Заполнить базу данных тестовыми данными? ${`(y/n)`.green.bold} `);
    } while ([`y`, `n`].indexOf(answer) < 0);

    if (answer === `n`) {
      console.log(`Вы отказались от заполнения базы данных`);
      rl.close();
    }

    do {
      answer = await question(`Введите количество записей? ${`(1..30, 0 - выход)`.green.bold} `);
      answer = parseInt(answer, 10);
    } while (isNaN(answer) || (answer < 1 && answer > 30));

    if (answer === 0) {
      console.log(`Вы отказались от ввода количества записей`);
      rl.close();
    }

    let testOffers;
    const count = answer;
    let isValid = true;
    do {
      testOffers = [];
      try {
        for (let i = 0; i < count; i++) {
          testOffers.push(validate(validationScheme, generateEntity()));
          isValid = true;
        }
      } catch (err) {
        isValid = false;
        console.log(`${err.message}: ${JSON.stringify(err.errors)}`);

        do {
          answer = await question(`Данные не прошли валидацию, попытаться ещё раз? ${`(y/n)`.green.bold} `);
        } while ([`y`, `n`].indexOf(answer) < 0);

        if (answer === `n`) {
          console.log(`Вы отказались от заполнения базы данных`);
          rl.close();
        }
      }
    } while (!isValid);

    answer = await offerStore.putManyOffers(testOffers);

    console.log(`Запись прошла успешно. Количество добавленных записей: ${answer.insertedCount}`);
    rl.close();
  },
};
