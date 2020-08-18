const User = require('../models/auth');
const {
  sendOne,
  sendUpdated,
  sendNotFound
} = require('../helpers/responseHelpers');

function me(req, res, next) {
  try {
    return sendOne(res, req.user);
  } catch (err) {
    next(err);
  }
}

async function publicProfile(req, res, next) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return sendNotFound(res);

    return sendOne(res, user.publicProfile());
  } catch (err) {
    next(err);
  }
}

async function updateProfile(req, res, next) {
  try {
    const user = await User.findById(req.user._id);

    Object.assign(user, req.body);
    await user.save();

    return sendUpdated(res, user);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  me,
  updateProfile,
  publicProfile
};
