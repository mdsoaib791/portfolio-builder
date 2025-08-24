import { Router } from 'express';
import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { ProjectController } from '../controllers/project.controller';
import asyncHandler from '../middlewares/asyncHandler.middleware';
import validateSchema from '../middlewares/validation.middleware';
import ProjectValidator from '../validators/project.validator';


/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management
 */
const projectRouter = Router();
const projectController = container.get<ProjectController>(TYPES.ProjectController);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by project title
 *       - in: query
 *         name: technologies
 *         schema:
 *           type: string
 *         description: Filter by technologies
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title or technologies
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of projects
 */
projectRouter.get('/', asyncHandler(projectController.getAllProjects));

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project found
 *       404:
 *         description: Project not found
 */
projectRouter.get('/:id', asyncHandler(projectController.getProjectById));

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectDto'
 *     responses:
 *       201:
 *         description: Project created
 *       400:
 *         description: Invalid input
 */
projectRouter.post('/', validateSchema(ProjectValidator), asyncHandler(projectController.createProject));

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectDto'
 *     responses:
 *       200:
 *         description: Project updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Project not found
 */
projectRouter.put('/:id', validateSchema(ProjectValidator), asyncHandler(projectController.updateProjectById));

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       204:
 *         description: Project deleted
 *       404:
 *         description: Project not found
 */
projectRouter.delete('/:id', asyncHandler(projectController.deleteProjectById));

export default projectRouter;
