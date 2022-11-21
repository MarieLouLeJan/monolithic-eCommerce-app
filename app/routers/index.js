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
import NotFoundError from '../helpers/NotFoundError.js';

import cart from '../services/cart.js';
import catalog from '../services/catalog.js'
import auth from '../services/auth.js';
import authObligatory from '../services/authObligatory.js'
import isAdmin from '../services/isAdmin.js'
import cartObligatory from '../services/cartObligatory.js'
import catalogAdmin from '../services/catalogAdmin.js';


router.use('/dashboard/admin/categories', catalogAdmin, authObligatory, isAdmin, categoryRouter);
router.use('/dashboard/admin/products', catalogAdmin, authObligatory, isAdmin, productRouter);
router.use('/dashboard/admin/TVA', catalogAdmin, authObligatory, isAdmin, TVARouter);
router.use('/dashboard/admin/users', catalogAdmin, authObligatory, isAdmin, userAdminRouter);


router.use('/', auth, catalog, catalogRouter, userRouter);

router.use('/cart', auth, cart, cartRouter);

router.use('/checkout', cartObligatory, authObligatory, checkoutRouter);

router.use('/dashboard/profil', authObligatory, profilRouter);


router.use((req, res, next) => {
    next(new NotFoundError('Resource not found'));
});

router.use(errorHandlers);

export default router;

