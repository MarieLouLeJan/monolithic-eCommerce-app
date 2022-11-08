import express from 'express';

const router = express.Router();

import categoryRouter from './adminRouters/categoryRouter.js';
import productRouter from './adminRouters/productRouter.js';
import TVARouter from './adminRouters/TVARouter.js';
import userAdminRouter from './adminRouters/userAdminRouter.js';

import catalogRouter from './shopRouters/catalogRouter.js';
import cartRouter from './shopRouters/cartRouter.js';
import checkoutRouter from './shopRouters/checkoutRouter.js';

import userRouter from './userRouters/userRouter.js';
import profilRouter from './userRouters/profilRouter.js';

import errorHandlers from '../helpers/errorHandlers.js';
import NotFoundError from '../helpers/notFoundError.js';

router.use('/', categoryRouter);
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

export default router;

