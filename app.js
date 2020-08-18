if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { handleNotFound, handleError } = require('./middleware/errorHandler');
require('./db/connection');

const app = express();

app.use(morgan('dev'));
app.use(
  cors(function(req, cb) {
    cb(null, { origin: true });
  })
  //   { origin: process.env.BACK_ORIGIN }
);
app.use(express.json());

// initialize passport
app.use('/auth', require('./routes/auth'));

app.use('/api/v1', require('./routes/api'));
app.use('/', require('./routes/web'));

// catch 404 errors
app.use(handleNotFound);

// error handler function
app.use(handleError);

module.exports = app;
