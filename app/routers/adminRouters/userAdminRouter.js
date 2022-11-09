import express from 'express';
const userAdminRouter = express.Router();

import userAdminController from '../../controllers/adminControllers/userAdminController.js';

import CW from '../../helpers/controllerWrapper.js';

userAdminRouter.get('/dashboard/admin/users',  CW(userAdminController.showAllUsers));

userAdminRouter.route('/dashboard/admin/users/createAdmin') 
                .get(CW(userAdminController.createAdminPage))
                .post(CW(userAdminController.createAdminAction));

export default userAdminRouter;
