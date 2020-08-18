const HttpStatus = require('http-status-codes');

/**
 * @param {import('express').Response} res
 * @param {Number} status
 * @param {*} [data]
 */
function sendResponse(res, status, data) {
  if (!res) throw new Error('param `res` cannot be undefined / null');

  if (!status) throw new Error('param `status` is required');

  return res.status(status).json(data);
}

function sendList(res, list) {
  return sendResponse(res, HttpStatus.OK, list);
}

function sendOne(res, obj) {
  return sendResponse(res, HttpStatus.OK, obj);
}

function sendCreated(res, obj) {
  return sendResponse(res, HttpStatus.CREATED, obj);
}

function sendUpdated(res, obj) {
  return sendResponse(res, HttpStatus.ACCEPTED, obj);
}

function sendDeleted(res) {
  return sendResponse(res, HttpStatus.NO_CONTENT);
}

function sendNotFound(res) {
  return sendResponse(res, HttpStatus.NOT_FOUND);
}

function sendInternalServerError(res) {
  return sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR);
}

function sendBadRequest(res, msg) {
  return sendResponse(res, HttpStatus.BAD_REQUEST, { message: msg });
}

module.exports = {
  sendList,
  sendOne,
  sendCreated,
  sendUpdated,
  sendDeleted,
  sendNotFound,
  sendInternalServerError,
  sendBadRequest
};
