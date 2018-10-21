'use strict';

const dbase = require(`./database/db`);

const connectAndRead = async () => {
  const db = await dbase;
  const collection = db.collection(`offers`);
  const data = await collection.findOne({date: 1539129600});
  console.log(data);
  // const d = await data.toArray();
  // console.log(d);
};
connectAndRead().catch((e) => {
  throw e;
});
