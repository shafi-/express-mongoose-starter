const ACCESSOR_NAME = 'redis';

const config = {
  prod: {
    host: '',
    port: '',
    name: ACCESSOR_NAME,
    options: {}
  },
  dev: {
    host: '',
    port: '',
    name: ACCESSOR_NAME,
    options: {}
  },
  test: {
    host: '',
    port: '',
    name: ACCESSOR_NAME,
    options: {}
  }
};

let env = process.env.NODE_ENV || 'dev';

if (!config[env]) {
  throw Error('Unrecognized NODE_ENV value. Should be prod/dev/test');
}

module.exports = config[env];
