'use strict';

const author = require(`./author`);
const description = require(`./description`);
const license = require(`./license`);
const version = require(`./version`);

const help = require(`./help`);
const wrong = require(`./wrong`);
const empty = require(`./empty`);

module.exports = {
  '--author': () => {
    author.execute();
  },
  '--description': () => {
    description.execute();
  },
  '--license': () => {
    license.execute();
  },
  '--version': () => {
    version.execute();
  },
  '--help': () => {
    help.execute();
  },
  'empty': () => {
    empty.execute();
  },
  'wrong': (argument) => {
    wrong.execute(argument);
  },
};
