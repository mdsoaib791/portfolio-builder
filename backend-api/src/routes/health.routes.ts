import { Router } from 'express';
import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { HealthController } from '../controllers/health.controller';
import asyncHandler from '../middlewares/asyncHandler.middleware';
import authentication from '../middlewares/authentication.middleware';

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Health check endpoints
 */

const healthRouter = Router();

const healthController = container.get<HealthController>(TYPES.HealthController);

/**
 * @swagger
 * /health/check:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 */
healthRouter.get('/check',[authentication], asyncHandler(healthController.check));

export default healthRouter;
