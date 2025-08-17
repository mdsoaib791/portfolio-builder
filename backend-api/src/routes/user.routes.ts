import { Router } from 'express';
import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { UserController } from '../controllers/user.controller';
import asyncHandler from '../middlewares/asyncHandler.middleware';

import { Roles } from '../enums/roles.enum';
import authentication from '../middlewares/authentication.middleware';
import authorization from '../middlewares/authorization.middleware';

const userRouter = Router();

const userController = container.get<UserController>(TYPES.UserController);

userRouter.get('/me', [authentication], asyncHandler(userController.getCurrentUser));
userRouter.get('/getbyemail', [authentication], asyncHandler(userController.getUserByEmail));
userRouter.get('/:id', [authentication], asyncHandler(userController.getUserById));
userRouter.put('/:id', [authentication], asyncHandler(userController.updateUserById));
userRouter.delete('/:id', [authentication, authorization([Roles.Administrator])], asyncHandler(userController.deleteUserById));

export default userRouter;
