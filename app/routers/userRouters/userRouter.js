import express from 'express';
const userRouter = express.Router();

import controller from '../../controllers/userControllers/userController.js';

import CW from '../../helpers/controllerWrapper.js';

import validate from '../../services/validations/validate.js';
import { userCreated } from '../../services/validations/schemas/user.js';
import bodyMaker from '../../services/bodyMakerUser.js'

userRouter.route('/login')
        .get(CW(controller.loginPage))
        .post(CW(controller.loginAction));
        
userRouter.get('/logout', CW(controller.logout));

userRouter.route('/register')
        .get(CW(controller.signupPage))
        .post(bodyMaker, validate(userCreated, 'body'), CW(controller.signupAction));

export default userRouter;