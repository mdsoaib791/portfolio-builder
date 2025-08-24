import { Router } from 'express';
import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { SkillController } from '../controllers/skill.controller';
import asyncHandler from '../middlewares/asyncHandler.middleware';
import authentication from '../middlewares/authentication.middleware';
import validateSchema from '../middlewares/validation.middleware';
import SkillValidator from '../validators/skill.validator';


/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Skill management
 */
const skillRouter = Router();
const skillController = container.get<SkillController>(TYPES.SkillController);

/**
 * @swagger
 * /skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by skill name
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *         description: Filter by skill level
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in name or level
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
 *         description: List of skills
 */
skillRouter.get('/', asyncHandler(skillController.getAllSkills));

/**
 * @swagger
 * /skills/{id}:
 *   get:
 *     summary: Get skill by ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Skill ID
 *     responses:
 *       200:
 *         description: Skill found
 *       404:
 *         description: Skill not found
 */
skillRouter.get('/:id', asyncHandler(skillController.getSkillById));

/**
 * @swagger
 * /skills:
 *   post:
 *     summary: Create a new skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SkillDto'
 *     responses:
 *       201:
 *         description: Skill created
 *       400:
 *         description: Invalid input
 */
skillRouter.post('/', validateSchema(SkillValidator), asyncHandler(skillController.createSkill));

/**
 * @swagger
 * /skills/{id}:
 *   put:
 *     summary: Update a skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Skill ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SkillDto'
 *     responses:
 *       200:
 *         description: Skill updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Skill not found
 */
skillRouter.put('/:id', validateSchema(SkillValidator), asyncHandler(skillController.updateSkillById));

/**
 * @swagger
 * /skills/{id}:
 *   delete:
 *     summary: Delete a skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Skill ID
 *     responses:
 *       204:
 *         description: Skill deleted
 *       404:
 *         description: Skill not found
 */
skillRouter.delete('/:id', authentication, asyncHandler(skillController.deleteSkillById));

export default skillRouter;
