const { User } = require('../../models/auth');
const basic = require('../basic')(User, 'userId');

module.exports = {
  handlers: basic,
  ReqRules: require('./rules')
};
