const testCRUD = require('./crud.test');

const data = {
  name: 'Refrigarator',
  brand: 'Walton',
  model: 'WR-M-001',
  unitPrice: 10000
};

const updates = {
  unitPrice: 9500
};

testCRUD(data, 'Product', '/product', updates, data, ['delete']);
