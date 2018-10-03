'use strict';

const generateEntity = () => {
  return {
    "author": {
      "avatar": `https://robohash.org/1111`,
    },
    "offer":
      {
        "title": `Маленький ужасный дворец`,
        "address": `900,150`,
        "price": 10000,
        "type": `house`,
        "rooms": 4,
        "guests": 100,
        "checkin": `14:00`,
        "checkout": `12:00`,
        "features": [`washer`, `wifi`],
        "description": ``,
        "photos": [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
          `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
      },
    "location": {"x": 900, "y": 150},
    "date": 1538599950,
  };
};

module.exports = generateEntity;
