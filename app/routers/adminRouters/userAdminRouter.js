import express from 'express';
const userAdminRouter = express.Router();

import controller from '../../controllers/adminControllers/userAdminController.js';

import CW from '../../helpers/controllerWrapper.js';

userAdminRouter.get('/',  CW(controller.showAllUsers));

userAdminRouter.route('/users/createAdmin') 
                .get(CW(controller.createAdminPage))
                .post(CW(controller.createAdminAction));

export default userAdminRouter;
