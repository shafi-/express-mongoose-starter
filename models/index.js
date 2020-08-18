const path = require('path');
const fs = require('fs');
// const _ = require('lodash');

const dirs = fs.readdirSync(__dirname);

dirs.forEach(dir => {
  // eslint-disable-next-line
  Object.values(require(path.join(__dirname, dir))).forEach((Model) => {
    if (typeof Model === 'function') {
      Model.createCollection();
    }
  });
});
