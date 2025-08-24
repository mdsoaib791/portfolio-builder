/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */
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

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 */
userRouter.get('/me', [authentication], asyncHandler(userController.getCurrentUser));

/**
 * @swagger
 * /users/getbyemail:
 *   get:
 *     summary: Get user by email
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email address of the user
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
userRouter.get('/getbyemail', [authentication], asyncHandler(userController.getUserByEmail));

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
userRouter.get('/:id', [authentication], asyncHandler(userController.getUserById));

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDto'
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
userRouter.put('/:id', [authentication], asyncHandler(userController.updateUserById));

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted
 *       404:
 *         description: User not found
 *       403:
 *         description: Forbidden
 */
userRouter.delete('/:id', [authentication, authorization([Roles.Administrator])], asyncHandler(userController.deleteUserById));

export default userRouter;
