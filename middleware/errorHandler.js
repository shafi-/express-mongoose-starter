/**
 * @typedef {Object} AppError
 * @property {Number} statusCode
 * @property {String} message
 * @property {String} name - Error Name
 * @property {Array} stackTrace
 * @extends {Error}
 */

const Handlers = {
  ApiError(err, response) {
    const status = err.status || 400;
    response = err.errors;
    return status;
  },
  MongoError(err, response) {
    response = 'MongoError';
    return null;
  },
  ValidationError(err, response) {
    const status = 422;
    response = err.errors;
    return status;
  },
  default(err, response) {
    const er = new InternalServerError(err);
    er.stackTrace = err.stackTrace;
    response = err.message;
    return null;
  }
};

/**
 * It will try to understand the error and env, then send a suitable response
 * @param {AppError} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
// eslint-disable-next-line no-unused-vars
function handleError(err, req, res, next) {
  let status = err.status || 500;
  let response = err;

  const handler = Handlers[err.name] || Handlers.default;
  const setStatus = handler(err, response);
  if (setStatus) status = setStatus;

  // const error = process.env.NODE_ENV === 'development' ? err : {};
  if (!['prod', 'production'].includes(process.env.NODE_ENV))
    console.error(err); // eslint-disable-line

  //respond to client
  res.status(status).json(response);
}

function urlNotFound(req, res, next) {
  const err = new Error('URL Not found');
  err.status = 404;
  next(err);
}

function InternalServerError(err) {
  Error.call(this);
  this.message = err.message;
  this.stackTrace = err.stackTrace;
}

module.exports = {
  handleError,
  handleNotFound: urlNotFound
};
