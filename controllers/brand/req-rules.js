const RequestSchema = {
  name: { type: String, require: true },
  category: { type: String, require: true },
  logo: { type: String, require: true }
};

module.exports = RequestSchema;
