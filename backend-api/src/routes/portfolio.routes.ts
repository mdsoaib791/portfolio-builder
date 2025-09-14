/**
 * @swagger
 * /generate-portfolio-ai:
 *   post:
 *     summary: Generate AI-based portfolio
 *     tags: [Portfolio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - intent
 *               - prompt
 *             properties:
 *               intent:
 *                 type: string
 *                 enum: [GENERATE_PORTFOLIO]
 *                 description: Must be 'GENERATE_PORTFOLIO'.
 *               prompt:
 *                 type: string
 *                 description: Context or instructions for portfolio generation.
 *     responses:
 *       200:
 *         description: Portfolio generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profileDescription:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/UserDto'
 *                 skills:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SkillDto'
 *                 projects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProjectDto'
 *                 workExperience:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/WorkExperienceDto'
 *       400:
 *         description: Bad request (validation error)
 *       500:
 *         description: Internal server error
 */
import { Router } from 'express';
import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { PortfolioController } from '../controllers/portfolio.controller';
import asyncHandler from '../middlewares/asyncHandler.middleware';




const generatePortfolioRouter = Router();
const portfolioController = container.get<PortfolioController>(TYPES.PortfolioController);

generatePortfolioRouter.post('/', asyncHandler(portfolioController.generateAI));

export default generatePortfolioRouter;
