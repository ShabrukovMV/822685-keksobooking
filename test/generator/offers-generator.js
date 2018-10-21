'use strict';

const generateEntity = require(`./generate`);

module.exports = (num = 100) => {
  let offers = [];
  for (let i = 0; i < num; i++) {
    offers.push(generateEntity());
  }
  return offers;
};
