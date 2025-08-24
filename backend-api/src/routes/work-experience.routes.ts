/**
 * @swagger
 * tags:
 *   name: WorkExperience
 *   description: Work Experience management
 */
import { Router } from 'express';
import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { WorkExperienceController } from '../controllers/work-experience.controller';
import asyncHandler from '../middlewares/asyncHandler.middleware';
import validateSchema from '../middlewares/validation.middleware';
import CreateWorkExperienceValidator from '../validators/work-experience.validator';

const workExperienceRouter = Router();
const workExperienceController = container.get<WorkExperienceController>(TYPES.WorkExperienceController);

/**
 * @swagger
 * /work-experience:
 *   get:
 *     summary: Get all work experiences
 *     tags: [WorkExperience]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: companyName
 *         schema:
 *           type: string
 *         description: Filter by company name
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *         description: Filter by position
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of work experiences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkExperienceDto'
 */

/**
 * @swagger
 * /work-experience:
 *   get:
 *     summary: Get all work experiences
 *     tags: [WorkExperience]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: companyName
 *         schema:
 *           type: string
 *         description: Filter by company name
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *         description: Filter by position
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of work experiences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkExperienceDto'
 */
workExperienceRouter.get('/', asyncHandler(workExperienceController.getAllWorkExperiences));

/**
 * @swagger
 * /work-experience/{id}:
 *   get:
 *     summary: Get work experience by ID
 *     tags: [WorkExperience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Work experience found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkExperienceDto'
 *       404:
 *         description: Work experience not found
 */

/**
 * @swagger
 * /work-experience/{id}:
 *   get:
 *     summary: Get work experience by ID
 *     tags: [WorkExperience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Work experience found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkExperienceDto'
 *       404:
 *         description: Work experience not found
 */
workExperienceRouter.get('/:id', asyncHandler(workExperienceController.getWorkExperienceById));

/**
 * @swagger
 * /work-experience:
 *   post:
 *     summary: Create work experience
 *     tags: [WorkExperience]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWorkExperienceModel'
 *     responses:
 *       201:
 *         description: Work experience created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkExperienceDto'
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /work-experience:
 *   post:
 *     summary: Create work experience
 *     tags: [WorkExperience]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWorkExperienceModel'
 *     responses:
 *       201:
 *         description: Work experience created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkExperienceDto'
 *       400:
 *         description: Invalid input
 */
import authentication from '../middlewares/authentication.middleware';
workExperienceRouter.post('/', authentication, validateSchema(CreateWorkExperienceValidator), asyncHandler(workExperienceController.createWorkExperience));

/**
 * @swagger
 * /work-experience/{id}:
 *   put:
 *     summary: Update work experience by ID
 *     tags: [WorkExperience]
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
 *             $ref: '#/components/schemas/CreateWorkExperienceModel'
 *     responses:
 *       200:
 *         description: Work experience updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkExperienceDto'
 *       404:
 *         description: Work experience not found
 */

/**
 * @swagger
 * /work-experience/{id}:
 *   put:
 *     summary: Update work experience by ID
 *     tags: [WorkExperience]
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
 *             $ref: '#/components/schemas/CreateWorkExperienceModel'
 *     responses:
 *       200:
 *         description: Work experience updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkExperienceDto'
 *       404:
 *         description: Work experience not found
 */
workExperienceRouter.put('/:id', authentication, asyncHandler(workExperienceController.updateWorkExperienceById));

/**
 * @swagger
 * /work-experience/{id}:
 *   delete:
 *     summary: Delete work experience by ID
 *     tags: [WorkExperience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Work experience deleted
 *       404:
 *         description: Work experience not found
 */

/**
 * @swagger
 * /work-experience/{id}:
 *   delete:
 *     summary: Delete work experience by ID
 *     tags: [WorkExperience]
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
 *         description: Work experience deleted
 *       404:
 *         description: Work experience not found
 */
workExperienceRouter.delete('/:id', authentication, asyncHandler(workExperienceController.deleteWorkExperienceById));

export default workExperienceRouter;
