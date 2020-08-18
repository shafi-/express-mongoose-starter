// const uriBuilder = require('mongo-uri-builder');

const credentials = {
  production: {},
  development: {
    host: 'localhost',
    port: '27017',
    database: 'mini_pos'
    // username: 'root',
    // password: 'localhost',
    // database: 't20_idealist'
  },
  test: {
    username: 'shafi',
    password: 'DLduwh2019!#34',
    database: 'duwh_dev_test'
  }
};

// eslint-disable-next-line
const connectionParams = {
  // username: 'dwh_mongoose',
  // password: 'beZIdb2019',
  host: '13.229.155.169',
  port: '28028',
  database: 'dwh_test',
  ...credentials[process.env.NODE_ENV || 'development']
  // replicas: [
  //   {
  //     host: '13.229.155.169',
  //     port: '28028'
  //   },
  //   {
  //     host: '3.0.48.139',
  //     port: '28028'
  //   }
  // ]
};

// mongodb+srv://shafi:<password>@shafi-ymjsy.mongodb.net/test?retryWrites=true&w=majority

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

const mLabUsername = 'shafi';
const mLabPass = 'mlab-shafi-2020';

module.exports = {
  // uri: uriBuilder(connectionParams),
  uri: `mongodb+srv://${mLabUsername}:${mLabPass}@shafi-ymjsy.mongodb.net/test?retryWrites=true&w=majority`,
  options
};
