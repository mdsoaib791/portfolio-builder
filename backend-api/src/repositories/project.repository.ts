import { CreateProjectModel, Project, UpdateProjectModel } from '../models/project.model';
import { PrismaClient } from '../prisma/generated/client';
import { IProjectRepository } from './interfaces/iproject.repository';

const prisma = new PrismaClient();

export class ProjectRepository implements IProjectRepository {
  async findAll(
    filters?: any,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): Promise<{
    projects: Project[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const where: any = {};
    if (filters) {
      if (filters.userId) where.userId = filters.userId;
      if (filters.title) where.title = { contains: filters.title, mode: 'insensitive' };
      if (filters.technologies) where.technologies = { contains: filters.technologies, mode: 'insensitive' };
      if (filters.search) {
        where.OR = [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { technologies: { contains: filters.search, mode: 'insensitive' } },
        ];
      }
    }
    const skip = (page - 1) * limit;
    const total = await prisma.project.count({ where });
    const projectsRaw = await prisma.project.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    });
    const projects: Project[] = projectsRaw.map(p => ({
      ...p,
      description: p.description === null ? undefined : p.description,
      url: p.url === null ? undefined : p.url,
      technologies: p.technologies === null ? undefined : p.technologies,
      endDate: p.endDate === null ? undefined : p.endDate,
    }));
    return {
      projects,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<Project | null> {
    const p = await prisma.project.findUnique({ where: { id } });
    if (!p) return null;
    return {
      ...p,
      description: p.description === null ? undefined : p.description,
      url: p.url === null ? undefined : p.url,
      technologies: p.technologies === null ? undefined : p.technologies,
      endDate: p.endDate === null ? undefined : p.endDate,
    };
  }

  async create(data: CreateProjectModel): Promise<Project> {
    const p = await prisma.project.create({ data });
    return {
      ...p,
      description: p.description === null ? undefined : p.description,
      url: p.url === null ? undefined : p.url,
      technologies: p.technologies === null ? undefined : p.technologies,
      endDate: p.endDate === null ? undefined : p.endDate,
    };
  }

  async update(id: string, data: UpdateProjectModel): Promise<Project | null> {
    const p = await prisma.project.update({ where: { id }, data });
    return {
      ...p,
      description: p.description === null ? undefined : p.description,
      url: p.url === null ? undefined : p.url,
      technologies: p.technologies === null ? undefined : p.technologies,
      endDate: p.endDate === null ? undefined : p.endDate,
    };
  }

  async delete(id: string): Promise<Project | null> {
    const p = await prisma.project.delete({ where: { id } });
    return {
      ...p,
      description: p.description === null ? undefined : p.description,
      url: p.url === null ? undefined : p.url,
      technologies: p.technologies === null ? undefined : p.technologies,
      endDate: p.endDate === null ? undefined : p.endDate,
    };
  }
}
