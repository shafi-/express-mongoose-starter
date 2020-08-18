const testCRUD = require('./crud.test');

const data = {
  name: 'Walton',
  category: 'Home Appliance',
  logo:
    'https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Walton_logo.png/220px-Walton_logo.png'
};

const updates = {
  category: 'Electronics'
};

testCRUD(data, 'Brand', '/brand', updates, data, ['delete']);
