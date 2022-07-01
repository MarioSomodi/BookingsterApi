import express from 'express';
import { userController } from '../controllers';

const userAdminRouter = express.Router();

userAdminRouter.get('/', userController.Get());
userAdminRouter.post('/', userController.Post());

export default userAdminRouter;
