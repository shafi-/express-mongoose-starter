module.exports = {
  name: { type: String, required: true },
  userType: {
    type: String,
    enum: ['admin', 'sales-person', 'shop', 'client'],
    required: true
  },
  phone: { type: String, required: true },
  address: String,
  shop: {
    type: {
      _id: { type: String, required: true },
      name: { type: String, required: true }
    },
    required() {
      return this.userType === 'shop';
    }
  }
};
