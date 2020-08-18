const { model, Schema } = require('mongoose');
let id = 1;

function validate(rules, update = false) {
  const schema = rules instanceof Schema ? rules : new Schema(rules);
  if (update)
    schema.requiredPaths().forEach(path => {
      schema.path(path).required(false);
    });
  const Model = model(`ReqSchema${id}`, schema);
  id++;
  return async (req, res, next) => {
    try {
      const m = new Model(req.body);
      await m.validate();
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = validate;
