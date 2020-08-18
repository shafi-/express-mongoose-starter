const Subject = require('../models/subject');
const basicCRUD = require('./basic')(Subject, 'subjectId');

const RequestSchema = {
  name: { type: String, require: true }
};

module.exports.handlers = basicCRUD;
module.exports.ReqRules = RequestSchema;
