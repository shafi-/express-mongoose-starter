const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.SchemaTypes;

// Create a schema
const userSchema = new Schema({
  method: {
    type: String,
    // enum: ['local'  , 'google', 'facebook'],
    default: 'local'
  },
  name: String,
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    }
  },
  userType: {
    type: String,
    enum: ['admin', 'sales-person', 'shop', 'client'],
    default: 'sales-person'
  },
  phone: { type: String, required: true, unique: true },
  address: String,
  nid: {
    type: String
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  shop: {
    _id: ObjectId,
    name: String,
    subscription: {
      from: Date,
      to: Date
    },
    status: {
      type: Boolean,
      default: true
    }
  }
});

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  if (obj.local) delete obj.local.password;
  return obj;
};

userSchema.method('publicProfile', function publicProfile() {
  const auth = this.local || this.google || this.facebook || {};
  return {
    _id: this._id,
    name: this.name,
    email: auth.email
  };
});

// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = { User };
