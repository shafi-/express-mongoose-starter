const { Schema } = require('mongoose');

const schema = new Schema({
  name: String,
  category: String,
  logo: String
});

module.exports = schema;
