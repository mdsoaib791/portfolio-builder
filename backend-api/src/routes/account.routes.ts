import { Router } from 'express';
import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { AccountController } from '../controllers/account.controller';
import asyncHandler from '../middlewares/asyncHandler.middleware';
import authentication from '../middlewares/authentication.middleware';
import validateSchema from '../middlewares/validation.middleware';
import LoginValidator from '../validators/login.validator';
import CreateUserValidator from '../validators/user.validator';
/**
 * @swagger
 * tags:
 *   name: Account
 *   description: Account management
 */

const accountRouter = Router();

const accountController = container.get<AccountController>(TYPES.AccountController);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginModel'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
accountRouter.post('/login', [validateSchema(LoginValidator)], asyncHandler(accountController.login));

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserModel'
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Invalid input
 */
accountRouter.post('/register', [validateSchema(CreateUserValidator)], asyncHandler(accountController.register));

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh authentication token
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refreshed
 *       401:
 *         description: Unauthorized
 */
accountRouter.post('/refresh-token', [authentication], asyncHandler(accountController.refreshToken));

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout from account
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
accountRouter.post('/logout', [authentication], asyncHandler(accountController.logout));

export default accountRouter;
