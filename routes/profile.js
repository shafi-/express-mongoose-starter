const router = require('express').Router();
const UserController = require('../controllers/profile');

router
  .route('/me')
  .get(UserController.me)
  .patch(UserController.updateProfile);

router.route('/:userId').get(UserController.publicProfile);

module.exports = router;
