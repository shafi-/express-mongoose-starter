const Router = require('express').Router;
const private = require('passport').authenticate('jwt', { session: false });
const { permit } = require('../middleware');

// Register Private routes
const privateRouter = Router();
privateRouter.use(private);

// admin
const adminRouter = Router();
adminRouter.use('/user', require('./user'));
adminRouter.use('/subject', require('./subject'));

// mount all api routes
privateRouter.use('/admin', permit('admin'), adminRouter);
privateRouter.use('/profile', require('./profile'));
// End of private routes

// Register Public routes
const publicRouter = Router();
publicRouter.use('/subject', require('./subject'));
// End of public routes

const router = Router();
router.use(publicRouter);
router.use(privateRouter);

module.exports = router;
