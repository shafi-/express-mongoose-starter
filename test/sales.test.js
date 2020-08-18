const testCRUD = require('./crud.test');

const data = {
  customer: {
    _id: '',
    name: 'Test Client',
    mobile: '01938429482',
    address: 'test address len, dhaka'
  },
  guaranteer: [
    {
      name: 'Test Guaranteer',
      mobile: '012389429483',
      address: 'test address len, dhaka'
    }
  ],
  salesDate: '01-20-2020',
  items: [
    {
      product: {
        _id: '5e25e26af3221015a4f37c38',
        name: 'Refrigarator',
        model: 'WR-M-01'
      },
      discount: {
        isPercentage: true,
        amount: 5
      },
      quantity: 1,
      unitPrice: 9500,
      totalPrice: 9500
    }
  ],
  subTotal: 9500,
  discount: {
    isPercentage: true,
    amount: 0
  },
  otherCharges: [
    {
      title: 'tax',
      amount: 1425,
      details: 'govt tax'
    }
  ],
  convenienceFee: {
    isPercentage: true,
    amount: 5
  },
  rounding: 71.25,
  total: 11400,
  downpayment: 3000,
  installment: {
    policy: 'monthly',
    count: 6
  },
  attachments: [
    {
      caption: 'nid',
      url: 'www.imageupload.com/ldakfj124'
    }
  ]
};

const updates = {
  guaranteer: {
    name: 'Updated Test Guaranteer'
  }
};

testCRUD(data, 'Sales', '/sales', updates, data, ['delete']);
