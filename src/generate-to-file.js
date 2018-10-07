'use strict';

const fs = require(`fs`);
const generateEntity = require(`./generate`);

const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

module.exports = {
  execute(path, num) {
    return new Promise((resolve, reject) => {
      let elements = [];
      for (let i = 0; i < num; i++) {
        elements.push(generateEntity());
      }
      fs.writeFile(path, JSON.stringify(elements), fileWriteOptions, (errWriteFile) => {
        if (errWriteFile) {
          return reject(errWriteFile);
        }
        return resolve();
      });
    });
  },
};

