import express from 'express';
const userAdminRouter = express.Router();

import userAdminController from '../../controllers/adminControllers/userAdminController.js';

import authObligatory from '../../services/authObligatory.js';
import isAdmin from '../../services/isAdmin.js';

import CW from '../../helpers/controllerWrapper.js';


userAdminRouter.get('/dashboard/admin/users', authObligatory, isAdmin, CW(userAdminController.showAllUsers));

userAdminRouter.route('/dashboard/admin/users/createAdmin') 
                .get(authObligatory, isAdmin, CW(userAdminController.createAdminPage))
                .post(authObligatory, isAdmin, CW(userAdminController.createAdminAction));

export default userAdminRouter;
