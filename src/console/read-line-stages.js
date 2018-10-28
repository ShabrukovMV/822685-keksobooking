'use strict';

const fs = require(`fs`);
const {promisify} = require(`util`);
const generateToFile = require(`./generate-to-file`);
const fsstat = promisify(fs.stat);

class ReadLineStages {
  constructor(rl) {
    this.numberElements = 0;
    this.fileName = ``;
    this.stage = this.askToGenerateData;
    this.rl = rl;
    this.rl.setPrompt(`Хотите сгенерировать данные? ${`(y/n)`.green.bold} `);
    rl.prompt();
  }

  askToGenerateData(line) {
    if (line === `y`) {
      this.rl.setPrompt(`Какоe количество элементов нужно сгенерировать? ${`(1..10, 0 - выход)`.green.bold} `);
      this.stage = this.askForNumberData;
    } else if (line === `n`) {
      this.rl.close();
    }
    this.rl.prompt();
  }

  askForNumberData(line) {
    this.numberElements = parseInt(line, 10);
    if (this.numberElements >= 1 && this.numberElements <= 10) {
      this.rl.setPrompt(`Задайте путь до файла в котором необходимо сохранить данные: `);
      this.stage = this.askForFileName;
    } else if (this.numberElements === 0) {
      console.log(`Вы задали нулевое кол-во элементов!`);
      this.rl.close();
    }
    this.rl.prompt();
  }

  async askForFileName(line) {
    this.fileName = line;
    try {
      const stats = await fsstat(this.fileName);
      if (stats.isDirectory()) {
        console.log(`Ошибка: путь ${this.fileName} является папкой!`);
      }
      if (stats.isFile()) {
        this.stage = this.askForOverwriteFile;
        this.rl.setPrompt(`Такой файл (${this.fileName}) уже существует, перезаписать данные? ${`(y/n) `.green.bold} `);
      }
      this.rl.prompt();
    } catch (e) {
      try {
        await generateToFile(this.fileName, this.numberElements);
        console.log(`Данные сгенерированы успешно!`);
        this.rl.close();
      } catch (errGenerateToFile) {
        console.log(`Ошибка записи файла: ${errGenerateToFile.code}`);
        this.rl.prompt();
      }
    }
  }

  async askForOverwriteFile(line) {
    if (line === `y`) {
      try {
        await generateToFile(this.fileName, this.numberElements);
        console.log(`Данные успешно сгенерированы и перезаписаны!`);
        this.rl.close();
      } catch (err) {
        console.log(`Ошибка перезаписи файла: ${err.code}`);
        this.rl.prompt();
      }
    } else if (line === `n`) {
      console.log(`Вы отказались от перезаписи данных!`);
      this.rl.close();
    } else {
      this.rl.prompt();
    }
  }

  async execute(line) {
    this.stage(line);
  }
}


module.exports = ReadLineStages;
