import express from 'express';
const userRouter = express.Router();

import userController from '../../controllers/userControllers/userController.js';

import CW from '../../helpers/controllerWrapper.js';

userRouter.route('/login')
        .get(CW(userController.loginPage))
        .post(CW(userController.loginAction));
userRouter.get('/logout', CW(userController.logout));

userRouter.route('/register')
        .get(CW(userController.signupPage))
        .post(CW(userController.signupAction));

export default userRouter;