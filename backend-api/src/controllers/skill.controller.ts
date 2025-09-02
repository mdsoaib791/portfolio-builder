import { Request, Response } from 'express';
import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import CustomResponse from '../dtos/custom-response';
import { SkillDto } from '../dtos/skill.dto';
import { CreateSkillModel, UpdateSkillModel } from '../models/skill.model';
import IUnitOfService from '../services/interfaces/iunitof.service';

export class SkillController {
  constructor(private unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)) {
    this.unitOfService = unitOfService;
  }

  getSkillById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const skill = await this.unitOfService.Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    const response: CustomResponse<SkillDto> = {
      success: true,
      data: skill,
    };
    return res.status(200).json(response);
  };
  getSkillByUserId = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const skill = await this.unitOfService.Skill.findByUserId(userId);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    const response: CustomResponse<SkillDto[]> = {
      success: true,
      data: skill,
    };
    return res.status(200).json(response);
  };

  getAllSkills = async (req: Request, res: Response) => {
    const { page, limit, sortBy, sortOrder, ...filters } = req.query;
    const result = await this.unitOfService.Skill.findAll(filters, Number(page) || 1, Number(limit) || 10, sortBy as string, sortOrder as string);
    const response: CustomResponse<SkillDto[]> = {
      success: true,
      data: result.skills,
    };
    return res.status(200).json({ ...response, total: result.total, page: result.page, limit: result.limit, totalPages: result.totalPages });
  };

  createSkill = async (req: Request, res: Response) => {
    const userId = req.body?.userId || '';
    const data: CreateSkillModel = { ...req.body, userId };
    const skill = await this.unitOfService.Skill.create(data);
    if (!skill) {
      return res.status(400).json({ message: 'Skill creation failed' });
    }
    const response: CustomResponse<SkillDto> = {
      success: true,
      data: skill,
    };
    return res.status(201).json(response);
  };

  updateSkillById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data: UpdateSkillModel = req.body;
    const skill = await this.unitOfService.Skill.update(id, data);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    const response: CustomResponse<SkillDto> = {
      success: true,
      data: skill,
    };
    return res.status(200).json(response);
  };

  deleteSkillById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const skill = await this.unitOfService.Skill.delete(id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    return res.status(204).send();
  };
}
