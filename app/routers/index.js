const express = require('express');

const router = express.Router();

const shopRouter = require('./app/routers/shopRouter');
const userRouter = require('./app/routers/userRouter');
const categoryAdminRouter = require('./app/routers/adminRouter/categoryAdminRouter');
const productAdminRouter = require('./app/routers/adminRouter/productAdminRouter');
const TVAAdminRouter = require('./app/routers/adminRouter/TVAAdminRouter');
const userAdminRouter = require('./app/routers/adminRouter/userAdminRouter');
const errorHandlers = require('./app/helpers/errorHandlers');
const NotFoundError = require('../helpers/notFoundError');

router.use(shopRouter)
router.use(userRouter);
router.use(categoryAdminRouter);
router.use(productAdminRouter);
router.user(TVAAdminRouter);
router.use(userAdminRouter);

router.use((_, _, next) => {
    // En argument on envoi le message de l'erreur, au niveau de l'instance on pourra le retrouver à
    // travers la propriété "message"
    next(new NotFoundError('Resource not found'));
});

router.use(errorHandlers);

module.exports = router;

