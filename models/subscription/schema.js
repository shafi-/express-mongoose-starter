const { Schema, SchemaTypes } = require('mongoose');

const { Mixed, ObjectId } = SchemaTypes;

const schema = new Schema(
  {
    shopId: { type: ObjectId, required: true },
    startAt: { type: Date, required: true },
    expireAt: {
      type: Date,
      default() {
        return this.startAt + 30;
      }
    },
    amount: { type: Date, required: true },
    by: { type: Mixed, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = schema;
