const DAY_IN_MILLI = 24 * 3600 * 1000;

function getFilters(req) {
  return req.query || {};
}

function getTimeRange(req) {
  let { start, end } = req.query;
  end = end ? new Date(end) : Date.now();
  start = start ? new Date(start) : end - 7 * DAY_IN_MILLI;
  return { start, end };
}

module.exports = { getFilters, getTimeRange };
