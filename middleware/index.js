const fs = require('fs');
const path = require('path');

const middlewareFiles = fs.readdirSync(__dirname);

const middlewares = {};

function getMiddlewareName(fileName) {
  return fileName.split('.')[0];
}

const ignore = ['index.js'];

middlewareFiles.forEach(fileName => {
  if (!ignore.includes(fileName)) {
    middlewares[getMiddlewareName(fileName)] = require(path.join(
      __dirname,
      fileName
    ));
  }
});

module.exports = middlewares;
