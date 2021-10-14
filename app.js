if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { handleNotFound, handleError } = require('./middleware/errorHandler');
require('./db/connection');

const app = express();

const cacheConfig = require('./configuration/cache');
app.use(
  require('express-redis')(
    cacheConfig.port,
    cacheConfig.host,
    cacheConfig.options,
    cacheConfig.name
  )
);

app.use(morgan('dev'));
app.use(
  cors(function(req, cb) {
    cb(null, { origin: true });
  })
  //   { origin: process.env.BACK_ORIGIN }
);
app.use(express.json());

app.get('/cache', (req, res, next) => {
  if (req.query.value) {
    return req.redis.set(req.query.key, req.query.value, (err, reply) => {
      if (err) {
        return res
          .status(500)
          .json(err)
          .end();
      }
      return res.json(reply);
    });
  } else {
    return req.redis.get(req.query.key, (err, reply) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.json(reply);
      }
    });
  }
});

// initialize passport
app.use('/auth', require('./routes/auth'));

app.use('/api/v1', require('./routes/api'));
app.use('/', require('./routes/web'));

// catch 404 errors
app.use(handleNotFound);

// error handler function
app.use(handleError);

module.exports = app;
