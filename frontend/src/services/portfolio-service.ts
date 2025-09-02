"use client";

import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';
import IUserService from './interfaces/iuser-service';
import ISkillService from './interfaces/iskill-service';
import IProjectService from './interfaces/iproject-service';
import IWorkExperienceService from './interfaces/iwork-experience-service';
import { UserDto } from '@/dtos/user-dto';
import { SkillDto } from '@/dtos/skill-dto';
import { ProjectDto } from '@/dtos/project-dto';
import { WorkExperienceDto } from '@/dtos/work-experience-dto';

export interface PortfolioData {
    user: UserDto | null;
    skills: SkillDto[] | null;
    projects: ProjectDto[] | null;
    workExperiences: WorkExperienceDto[] | null;
}

export class PortfolioService {
    private userService: IUserService;
    private skillService: ISkillService;
    private projectService: IProjectService;
    private workExperienceService: IWorkExperienceService;

    constructor() {
        this.userService = container.get<IUserService>(TYPES.IUserService);
        this.skillService = container.get<ISkillService>(TYPES.ISkillService);
        this.projectService = container.get<IProjectService>(TYPES.IProjectService);
        this.workExperienceService = container.get<IWorkExperienceService>(TYPES.IWorkExperienceService);
    }

    async getUserPortfolioData(userId: string): Promise<PortfolioData> {
        try {
            // Fetch all data in parallel for performance
            const [userResponse, skillsResponse, projectsResponse, workExperiencesResponse] = await Promise.all([
                this.userService.getById(userId),
                this.skillService.getAll({ userId: userId }),
                this.projectService.getAll({ userId: userId }),
                this.workExperienceService.getAll({ userId: userId })
            ]);

            return {
                user: userResponse.data.data,
                skills: Array.isArray(skillsResponse.data.data) ? skillsResponse.data.data : [],
                projects: Array.isArray(projectsResponse.data.data) ? projectsResponse.data.data : [],
                workExperiences: Array.isArray(workExperiencesResponse.data.data) ? workExperiencesResponse.data.data : []
            };
        } catch (error) {
            console.error('Error fetching portfolio data:', error);
            return {
                user: null,
                skills: null,
                projects: null,
                workExperiences: null
            };
        }
    }
}

export const portfolioService = new PortfolioService();
