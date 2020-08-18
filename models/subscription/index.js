const db = require('mongoose');
const schema = require('./schema');

const Subscription = db.model('Subscription', schema);

module.exports = { Subscription };
