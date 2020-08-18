const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Welcome to your Easy Installment application');
});

module.exports = router;
