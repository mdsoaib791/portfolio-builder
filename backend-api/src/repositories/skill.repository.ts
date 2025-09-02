import { CreateSkillModel, UpdateSkillModel } from '../models/skill.model';
import { SkillFilterParams } from '../params/skill.params';
import { PrismaClient, Skill } from '../prisma/generated/client';
import { ISkillRepository } from './interfaces/iskill.repository';

const prisma = new PrismaClient();

export class SkillRepository implements ISkillRepository {
  async findAll(
    filters?: SkillFilterParams,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): Promise<{
    skills: Skill[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const where: any = {};
    if (filters) {
      if (filters.userId) where.userId = filters.userId;
      if (filters.name) where.name = { contains: filters.name, mode: 'insensitive' };
      if (filters.level) where.level = { contains: filters.level, mode: 'insensitive' };
      if (filters.search) {
        where.OR = [
          { name: { contains: filters.search, mode: 'insensitive' } },
          { level: { contains: filters.search, mode: 'insensitive' } },
        ];
      }
    }
    const skip = (page - 1) * limit;
    const total = await prisma.skill.count({ where });
    const skillsRaw = await prisma.skill.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    });
    const skills: Skill[] = skillsRaw.map(s => ({
      ...s,
      level: s.level === undefined ? null : s.level,
      description: s.description === undefined ? null : s.description,
    }));
    return {
      skills,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: number): Promise<Skill | null> {
    const s = await prisma.skill.findUnique({ where: { id } });
    if (!s) return null;
    return {
      ...s,
      level: s.level === undefined ? null : s.level,
      description: s.description === undefined ? null : s.description,
    };
  }
  // async findByUserId(userId: string): Promise<Skill[]> {
  //   const skills = await prisma.skill.findMany({ where: { userId } });
  //   return skills.map(s => ({
  //     ...s,
  //     level: s.level ?? null,
  //     description: s.description ?? null,
  //   }));
  // }

  async findByUserId(userId: string): Promise<Skill[]> {
    const skills = await prisma.skill.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, // optional: to get latest first
    });

    return skills.map((s) => ({
      ...s,
      level: s.level ?? null,
      description: s.description ?? null,
    }));
  }


  async create(data: CreateSkillModel): Promise<Skill> {
    const { userId, name, level, description } = data; // only allowed fields

    const s = await prisma.skill.create({
      data: { userId, name, level, description }
    });

    return s;
  }
  // async create(data: CreateSkillModel): Promise<Skill> {
  //   const s = await prisma.skill.create({ data });
  //   console.log(s)
  //   return {
  //     ...s,
  //     level: s.level === null ? undefined : s.level,
  //     description: s.description === null ? undefined : s.description,
  //   };
  // }

  // async create(data: CreateSkillModel): Promise<Skill> {
  //   // Omit id if present in data (defensive)
  //   const { id, ...dataWithoutId } = data as any;
  //   const s = await prisma.skill.create({ data: dataWithoutId });
  //   return {
  //     ...s,
  //     level: s.level === undefined ? null : s.level,
  //     description: s.description === undefined ? null : s.description,
  //   };
  // }

  async update(id: number, data: UpdateSkillModel): Promise<Skill | null> {
    const s = await prisma.skill.update({ where: { id }, data });
    return {
      ...s,
      level: s.level === undefined ? null : s.level,
      description: s.description === undefined ? null : s.description,
    };
  }

  async delete(id: number): Promise<Skill | null> {
    const s = await prisma.skill.delete({ where: { id } });
    return {
      ...s,
      level: s.level === undefined ? null : s.level,
      description: s.description === undefined ? null : s.description,
    };
  }
}
