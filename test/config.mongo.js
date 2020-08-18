const mongoose = require('mongoose');
const config = require('../configuration').mongoDB;

mongoose.Promise = global.Promise;
const db = mongoose
  .connect(config.uri, config.options)
  .then(v => {
    console.log('Successfully connected to database.');
    return v;
  })
  .catch(err => console.log('database err', err));

module.exports = db;
