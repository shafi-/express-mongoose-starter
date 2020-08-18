const mongoose = require('mongoose');
const config = require('../configuration').mongoDB;

//mongoose-mongodb
mongoose.Promise = global.Promise;
const db = mongoose
  .connect(
    config.uri,
    // { useNewUrlParser: true },
    config.options,
    err => {
      if (err) throw err;
    console.log('Successfully connected to database.'); // eslint-disable-line
    }
  )
  .catch(err => {
  console.log('database err', err); // eslint-disable-line
  });

module.exports = db;
