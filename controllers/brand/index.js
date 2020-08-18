const { Brand } = require('../../models/brand');
const basicCRUD = require('../basic')(Brand, 'brandId');

module.exports.handlers = basicCRUD;
module.exports.ReqRules = require('./req-rules');
