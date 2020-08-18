const db = require('mongoose');

const schema = new db.Schema({
  name: { type: String, required: true }
});

const Subject = db.model('Subject', schema);

module.exports = Subject;
