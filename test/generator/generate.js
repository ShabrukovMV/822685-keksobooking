'use strict';

const conditions = require(`./generate-conditions`);

const generateRandomNumberInInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let randomPos = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomPos]] = [array[randomPos], array[i]];
  }
};

const generateEntity = () => {
  const location = {
    "x": generateRandomNumberInInterval(conditions.location.x.min, conditions.location.x.max),
    "y": generateRandomNumberInInterval(conditions.location.y.min, conditions.location.y.max),
  };
  let features = [...conditions.offer.features.values];
  let photos = [...conditions.offer.photos.values];
  shuffleArray(features);
  shuffleArray(photos);

  return {
    "author": {
      "avatar": `https://robohash.org/${Math.random().toString(36).slice(2)}`,
    },
    "offer":
      {
        "title": conditions.offer.title.values[generateRandomNumberInInterval(0, conditions.offer.title.values.length - 1)],
        "address": `${location.x},${location.y}`,
        "price": generateRandomNumberInInterval(conditions.offer.price.min / 1000, conditions.offer.price.max / 1000) * 1000,
        "type": conditions.offer.type.values[generateRandomNumberInInterval(0, conditions.offer.type.values.length - 1)],
        "rooms": generateRandomNumberInInterval(conditions.offer.rooms.min, conditions.offer.rooms.max),
        "guests": generateRandomNumberInInterval(conditions.offer.guests.min, conditions.offer.guests.min + 10),
        "checkin": conditions.offer.checkin.values[generateRandomNumberInInterval(0, conditions.offer.checkin.values.length - 1)],
        "checkout": conditions.offer.checkout.values[generateRandomNumberInInterval(0, conditions.offer.checkout.values.length - 1)],
        "features": features.slice(0, generateRandomNumberInInterval(1, features.length)),
        "description": ``,
        "photos": photos,
      },
    "location": {
      "x": location.x,
      "y": location.y,
    },
    "date": new Date().setUTCHours(0, 0, 0, 0) / 1000 - generateRandomNumberInInterval(0, conditions.date.daysBack) * conditions.date.dayUNIX,
  };
};

module.exports = generateEntity;
