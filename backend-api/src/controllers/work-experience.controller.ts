import { Request, Response } from 'express';
import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import CustomResponse from '../dtos/custom-response';
import { UpdateWorkExperienceDto, WorkExperienceDto } from '../dtos/work-experience.dto';
import { CreateWorkExperienceModel } from '../models/work-experience.model';
import { IWorkExperienceService } from '../services/interfaces/iwork-experience.service';

export class WorkExperienceController {
  constructor(private workExperienceService = container.get<IWorkExperienceService>(TYPES.IWorkExperienceService)) {
    this.workExperienceService = workExperienceService;
  }

  getWorkExperienceById = async (req: Request, res: Response): Promise<Response<CustomResponse<WorkExperienceDto>>> => {
    const id = req.params.id;
    const workExperience = await this.workExperienceService.findById(id);
    if (!workExperience) {
      return res.status(404).json({ message: 'Work experience not found' });
    }
    const response: CustomResponse<WorkExperienceDto> = {
      success: true,
      data: workExperience,
    };
    return res.status(200).json(response);
  };

  getAllWorkExperiences = async (req: Request, res: Response): Promise<Response<CustomResponse<WorkExperienceDto[]>>> => {
    const { page, limit, sortBy, sortOrder, ...filters } = req.query;
    const result = await this.workExperienceService.findAll(filters, Number(page) || 1, Number(limit) || 10, sortBy as string, sortOrder as string);
    const response: CustomResponse<WorkExperienceDto[]> = {
      success: true,
      data: result.workExperiences,
      // Optionally, you can add meta info in a separate property if needed
    };
    return res.status(200).json({ ...response, total: result.total, page: result.page, limit: result.limit, totalPages: result.totalPages });
  };

  createWorkExperience = async (req: Request, res: Response): Promise<Response<CustomResponse<WorkExperienceDto>>> => {
    const data = req.body as CreateWorkExperienceModel;
    const workExperience = await this.workExperienceService.create(data);
    if (!workExperience) {
      return res.status(400).json({ message: 'Work experience creation failed' });
    }
    const response: CustomResponse<WorkExperienceDto> = {
      success: true,
      data: workExperience,
    };
    return res.status(201).json(response);
  };

  updateWorkExperienceById = async (req: Request, res: Response): Promise<Response<CustomResponse<WorkExperienceDto>>> => {
    const id = req.params.id;
    const data = req.body as UpdateWorkExperienceDto;
    const workExperience = await this.workExperienceService.update(id, data);
    if (!workExperience) {
      return res.status(404).json({ message: 'Work experience not found' });
    }
    const response: CustomResponse<WorkExperienceDto> = {
      success: true,
      data: workExperience,
    };
    return res.status(200).json(response);
  };

  deleteWorkExperienceById = async (req: Request, res: Response): Promise<Response<CustomResponse<WorkExperienceDto>>> => {
    const id = req.params.id;
    const workExperience = await this.workExperienceService.delete(id);
    if (!workExperience) {
      return res.status(404).json({ message: 'Work experience not found' });
    }
    const response: CustomResponse<WorkExperienceDto> = {
      success: true,
      data: workExperience,
    };
    return res.status(200).json(response);
  };
}
