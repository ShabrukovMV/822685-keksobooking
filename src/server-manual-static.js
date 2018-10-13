'use strict';

const packageInfo = require(`../package.json`);

const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const util = require(`util`);
const path = require(`path`);

const readFile = util.promisify(fs.readFile);

const hostname = `127.0.0.1`;
const rootServerPath = `${__dirname}/../static`;
const strictListMimeTypes = {
  '.css': `text/css`,
  '.png': `image/png`,
  '.html': `text/html; charset=UTF-8`,
  '.htm': `text/html; charset=UTF-8`,
  '.jpg': `image/jpeg`,
  '.jpeg': `image/jpeg`,
  '.gif': `image/gif`,
  '.ico': `image/x-icon`,
};

const readSendFile = async (pathName, res) => {
  let contentType = strictListMimeTypes[path.parse(pathName).ext];
  contentType = contentType ? contentType : `text/html`;
  try {
    const file = await readFile(`${rootServerPath}${pathName}`);
    res.statusCode = 200;
    res.setHeader(`Content-Type`, contentType);
    res.end(file);
  } catch (err) {
    if (err.code === `ENOENT`) {
      res.statusCode = 404;
    } else {
      res.statusCode = 502;
    }
    res.end();
  }
};

const serverHandler = (req, res) => {
  let pathName = url.parse(req.url).pathname;
  console.log(`Запрос: ${pathName}`);
  pathName = pathName !== `/` ? pathName : `/index.html`;

  readSendFile(pathName, res);
};

module.exports = {
  name: `server`,
  description: `Запускает сервер «${packageInfo.name}».`,
  execute(port = 3000) {
    const server = http.createServer(serverHandler);
    server.listen(port, hostname, (err) => {
      if (err) {
        return console.log(err.message);
      }
      return console.log(`Сервер ${`«${packageInfo.name}»`.green.bold} запущен по адресу: http://${hostname}:${port}`);
    });
  },
};
