import { Request, Response } from 'express';
import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import CustomResponse from '../dtos/custom-response';
import { CreateSkillDto, SkillDto, UpdateSkillDto } from '../dtos/skill.dto';
import { ISkillService } from '../services/interfaces/iskill.service';

export class SkillController {
  constructor(private skillService = container.get<ISkillService>(TYPES.ISkillService)) {
    this.skillService = skillService;
  }

  getSkillById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const skill = await this.skillService.findById(id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    const response: CustomResponse<SkillDto> = {
      success: true,
      data: skill,
    };
    return res.status(200).json(response);
  };

  getAllSkills = async (req: Request, res: Response) => {
    const { page, limit, sortBy, sortOrder, ...filters } = req.query;
    const result = await this.skillService.findAll(filters, Number(page) || 1, Number(limit) || 10, sortBy as string, sortOrder as string);
    const response: CustomResponse<SkillDto[]> = {
      success: true,
      data: result.skills,
    };
    return res.status(200).json({ ...response, total: result.total, page: result.page, limit: result.limit, totalPages: result.totalPages });
  };

  createSkill = async (req: Request, res: Response) => {
    const userId = req.body?.currentUserId || '';
    const data: CreateSkillDto = { ...req.body, userId };
    const skill = await this.skillService.create(data);
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
    const id = req.params.id;
    const data: UpdateSkillDto = req.body;
    const skill = await this.skillService.update(id, data);
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
    const id = req.params.id;
    const skill = await this.skillService.delete(id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    return res.status(204).send();
  };
}
