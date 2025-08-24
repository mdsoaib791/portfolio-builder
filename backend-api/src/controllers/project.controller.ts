import { Request, Response } from 'express';
import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import CustomResponse from '../dtos/custom-response';
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from '../dtos/project.dto';
import CustomError from '../exceptions/custom-error';
import { IProjectService } from '../services/interfaces/iproject.service';

export class ProjectController {
  constructor(private projectService = container.get<IProjectService>(TYPES.IProjectService)) {
    this.projectService = projectService;
  }

  getProjectById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const project = await this.projectService.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const response: CustomResponse<ProjectDto> = {
      success: true,
      data: project,
    };
    return res.status(200).json(response);
  };

  getAllProjects = async (req: Request, res: Response) => {
    const { page, limit, sortBy, sortOrder, ...filters } = req.query;
    const result = await this.projectService.findAll(filters, Number(page) || 1, Number(limit) || 10, sortBy as string, sortOrder as string);
    const response: CustomResponse<ProjectDto[]> = {
      success: true,
      data: result.projects,
    };
    return res.status(200).json({ ...response, total: result.total, page: result.page, limit: result.limit, totalPages: result.totalPages });
  };

  createProject = async (req: Request, res: Response) => {
    const userId = req.body?.currentUserId || '';
    if (!userId) {
      throw new CustomError('User ID is required', 400);
    }
    const data: CreateProjectDto = { ...req.body, userId };
    const project = await this.projectService.create(data);
    if (!project) {
      return res.status(400).json({ message: 'Project creation failed' });
    }
    const response: CustomResponse<ProjectDto> = {
      success: true,
      data: project,
    };
    return res.status(201).json(response);
  };

  updateProjectById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data: UpdateProjectDto = req.body;
    const project = await this.projectService.update(id, data);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const response: CustomResponse<ProjectDto> = {
      success: true,
      data: project,
    };
    return res.status(200).json(response);
  };

  deleteProjectById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const project = await this.projectService.delete(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(204).send();
  };
}
