const router = require('express').Router();
const validateBody = require('../middleware/validateBody');
const { handlers, ReqRules } = require('../controllers/user');

router
  .route('/')
  .get(handlers.list)
  .post(validateBody(ReqRules), handlers.add);

router
  .route('/:userId')
  .get(handlers.byId)
  .patch(validateBody(ReqRules, true), handlers.update)
  .delete(handlers.remove);

module.exports = router;
