const express = require('express');
const userRouter = express.Router();

const userController = require('../../controllers/userControllers/userController');

const CW = require('../../helpers/controllerWrapper');

userRouter.route('/login')
        .get(CW(userController.loginPage))
        .post(CW(userController.loginAction));
userRouter.get('/logout', CW(userController.logout));

userRouter.route('/register')
        .get(CW(userController.signupPage))
        .post(CW(userController.signupAction));


module.exports = userRouter;