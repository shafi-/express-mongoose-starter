const db = require('mongoose');
const schema = require('./schema');

const Brand = db.model('Brand', schema);

module.exports = { Brand };
