'use strict';


const fs = require(`fs`);
const {promisify} = require(`util`);
const generateToFile = require(`./generate-to-file`);
const fsstat = promisify(fs.stat);

class ReadLineStages {
  constructor(rl) {
    this.numberElements = 0;
    this.fileName = ``;
    this.stage = `askGenData`;
    rl.setPrompt(`Хотите сгенерировать данные? ${`(y/n)`.green.bold} `);
    rl.prompt();
  }

  askGenData(line, rl) {
    if (line === `y`) {
      rl.setPrompt(`Какоe количество элементов нужно сгенерировать? ${`(1..10, 0 - выход)`.green.bold} `);
      this.stage = `askNumData`;
    } else if (line === `n`) {
      rl.close();
    }
    rl.prompt();
  }

  askNumData(line, rl) {
    this.numberElements = parseInt(line, 10);
    if (this.numberElements >= 1 && this.numberElements <= 10) {
      rl.setPrompt(`Задайте путь до файла в котором необходимо сохранить данные: `);
      this.stage = `askFileName`;
    } else if (this.numberElements === 0) {
      console.log(`Вы задали нулевое кол-во элементов!`);
      rl.close();
    }
    rl.prompt();
  }

  async askFileName(line, rl) {
    this.fileName = line;
    try {
      const stats = await fsstat(this.fileName);
      if (stats.isDirectory()) {
        console.log(`Ошибка: путь ${this.fileName} является папкой!`);
      }
      if (stats.isFile()) {
        this.stage = `fileExists`;
        rl.setPrompt(`Такой файл (${this.fileName}) уже существует, перезаписать данные? ${`(y/n) `.green.bold} `);
      }
      rl.prompt();
    } catch (e) {
      try {
        await generateToFile.execute(this.fileName, this.numberElements);
        console.log(`Данные сгенерированы успешно!`);
        rl.close();
      } catch (errGenerateToFile) {
        console.log(`Ошибка записи файла: ${errGenerateToFile.code}`);
        rl.prompt();
      }
    }
  }

  async fileExists(line, rl) {
    if (line === `y`) {
      try {
        await generateToFile.execute(this.fileName, this.numberElements);
        console.log(`Данные успешно сгенерированы и перезаписаны!`);
        rl.close();
      } catch (err) {
        console.log(`Ошибка записи файла: ${err.code}`);
        rl.prompt();
      }
    } else if (line === `n`) {
      console.log(`Вы отказались от перезаписи данных!`);
      rl.close();
    } else {
      rl.prompt();
    }
  }

  async execute(line, rl) {
    this[this.stage](line, rl);
  }
}


module.exports = ReadLineStages;
