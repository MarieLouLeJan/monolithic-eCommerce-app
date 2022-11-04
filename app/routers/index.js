const express = require('express');

const router = express.Router();

const adressTypeRouter = require('./adminRouters/adressTypeRouter');
const categoryRouter = require('./adminRouters/categoryRouter');
const orderStateRouter = require('./adminRouters/adressTypeRouter');
const productRouter = require('./adminRouters/productRouter');
const TVARouter = require('./adminRouters/TVARouter');
const userAdminRouter = require('./adminRouters/userAdminRouter');

const catalogRouter = require('./shopRouters/catalogRouter');
const cartRouter = require('./shopRouters/cartRouter');
const checkoutRouter = require('./shopRouters/checkoutRouter');

const userRouter = require('./userRouters/userRouter');
const profilRouter = require('./userRouters/profilRouter');

const errorHandlers = require('../helpers/errorHandlers');
const NotFoundError = require('../helpers/notFoundError');

router.use('/', adressTypeRouter);
router.use('/', categoryRouter);
router.use('/', orderStateRouter);
router.use('/', productRouter);
router.use('/', TVARouter);
router.use('/', userAdminRouter);

router.use('/', catalogRouter);
router.use('/', cartRouter);
router.use('/', checkoutRouter);

router.use('/', userRouter);
router.use('/', profilRouter);


router.use((req, res, next) => {
    next(new NotFoundError('Resource not found'));
});

router.use(errorHandlers);

module.exports = router;

