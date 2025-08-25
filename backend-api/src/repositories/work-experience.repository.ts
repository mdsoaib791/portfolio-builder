import { CreateWorkExperienceDto, UpdateWorkExperienceDto, WorkExperienceDto } from '../dtos/work-experience.dto';
import { WorkExperienceFilterParams } from '../params/work-experience.params';
import prisma from '../prisma';
import { IWorkExperienceRepository } from './interfaces/iwork-experience.repository';

export class WorkExperienceRepository implements IWorkExperienceRepository {
  async findAll(
    filters?: WorkExperienceFilterParams,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): Promise<{
    workExperiences: WorkExperienceDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const where: any = {};

    if (filters) {
      if (filters.userId) where.userId = filters.userId;
      if (filters.companyName) where.companyName = { contains: filters.companyName, mode: 'insensitive' };
      if (filters.position) where.position = { contains: filters.position, mode: 'insensitive' };
      if (filters.location) where.location = { contains: filters.location, mode: 'insensitive' };
      if (filters.startDate) where.startDate = { gte: filters.startDate };
      if (filters.endDate) where.endDate = { lte: filters.endDate };
      if (filters.search) {
        where.OR = [
          { companyName: { contains: filters.search, mode: 'insensitive' } },
          { position: { contains: filters.search, mode: 'insensitive' } },
          { location: { contains: filters.search, mode: 'insensitive' } },
        ];
      }
    }

    const skip = (page - 1) * limit;
    const total = await prisma.workExperience.count({ where });

    const workExperiences = await prisma.workExperience.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    });

    return {
      workExperiences,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<WorkExperienceDto | null> {
    return prisma.workExperience.findUnique({
      where: { id },
    });
  }

  async create(data: CreateWorkExperienceDto): Promise<WorkExperienceDto> {
    return prisma.workExperience.create({
      data: {
        userId: data.userId,
        companyName: data.companyName,
        position: data.position,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        description: data.description,
        location: data.location,
      },
    });
  }

  async update(id: string, data: UpdateWorkExperienceDto): Promise<WorkExperienceDto> {
    return prisma.workExperience.update({
      where: { id },
      data: {
        userId: data.userId,
        companyName: data.companyName,
        position: data.position,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        description: data.description,
        location: data.location,
      },
    });
  }

  async delete(id: string): Promise<WorkExperienceDto> {
    return prisma.workExperience.delete({
      where: { id },
    });
  }
}
