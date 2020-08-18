const router = require('express').Router();
const { handlers, ReqRules } = require('../controllers/subject');
const validateBody = require('../middleware/validateBody')(ReqRules);

router
  .route('/')
  .get(handlers.list)
  .post(validateBody, handlers.add);

router
  .route('/:brandId')
  .get(handlers.byId)
  .patch(validateBody, handlers.update)
  .delete(handlers.remove);

module.exports = router;
