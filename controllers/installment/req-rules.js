const ReqRules = {
  saleId: {
    type: String,
    required: false
  },
  dueDate: {
    type: Date
  },
  amount: {
    type: Number,
    required: true
  },
  fee: Number,
  feeDetails: {
    type: String,
    required() {
      return this.fee;
    }
  },
  remarks: String
};

module.exports = ReqRules;
