function AccessDenied(msg = 'Access Denied') {
  const err = new Error(msg);
  err.status = 403;
  return err;
}

function BadRequest() {
  const err = new Error('Bad request');
  err.status = 400;
  return err;
}

const DEBUG_ALLOW = true;

function permit(userType) {
  return function(req, res, next) {
    if (!req.user || !req.user.shop) return next(BadRequest());

    if (req.user.userType !== userType)
      return next(AccessDenied(`Only ${userType} users are allowed to access`));

    if (req.user.userType !== 'shop') return next();

    if (DEBUG_ALLOW) return next();
    // check subscription for shop
    const { status, subscription } = req.user.shop;
    const from = new Date(subscription.from).getMilliseconds;
    const to = new Date(subscription.to).getMilliseconds;
    const now = Date.now();
    if (status && from >= now && now <= to) next();
    return next(AccessDenied('Subscribe first'));
  };
}

module.exports = permit;
