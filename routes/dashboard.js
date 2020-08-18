const router = require('express').Router();
const DashboardHandler = require('../controllers/dashboard');

router.get('/', DashboardHandler.index);

module.exports = router;
