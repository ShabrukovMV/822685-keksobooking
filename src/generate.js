'use strict';

const conditions = require(`../src/generate-conditions`);

const genRndNumInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getRndPosOrNeg = () => {
  return (Math.random() - 0.5);
};
const location = {
  "x": genRndNumInterval(conditions.location.x.min, conditions.location.x.max),
  "y": genRndNumInterval(conditions.location.y.min, conditions.location.y.max),
};

const generateEntity = () => {
  return {
    "author": {
      "avatar": `https://robohash.org/${Math.random().toString(36).slice(2)}`,
    },
    "offer":
      {
        "title": conditions.offer.title.values[genRndNumInterval(0, conditions.offer.title.values.length - 1)],
        "address": `${location.x},${location.y}`,
        "price": genRndNumInterval(conditions.offer.price.min, conditions.offer.price.max),
        "type": conditions.offer.type.values[genRndNumInterval(0, conditions.offer.type.values.length - 1)],
        "rooms": genRndNumInterval(conditions.offer.rooms.min, conditions.offer.rooms.max),
        "guests": genRndNumInterval(conditions.offer.guests.min, conditions.offer.guests.min + 10),
        "checkin": conditions.offer.checkin.values[genRndNumInterval(0, conditions.offer.checkin.values.length - 1)],
        "checkout": conditions.offer.checkout.values[genRndNumInterval(0, conditions.offer.checkout.values.length - 1)],
        "features": conditions.offer.features.values.sort(getRndPosOrNeg).slice(0, genRndNumInterval(1, conditions.offer.features.values.length)),
        "description": ``,
        "photos": conditions.offer.photos.values.sort(getRndPosOrNeg),
      },
    "location": {
      "x": location.x,
      "y": location.y,
    },
    "date": Math.floor(new Date() / 1000 - genRndNumInterval(0, conditions.date.daysBack * conditions.date.dayUNIX)),
  };
};

module.exports = generateEntity;
