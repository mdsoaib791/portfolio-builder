import { UserDto } from './user-dto';
import { ProjectDto } from './project-dto';
import { SkillDto } from './skill-dto';
import { WorkExperienceDto } from './work-experience-dto';

export interface RagQueryDto {
    prompt: string;
    type: 'query' | 'portfolio-generation' | 'cv-upload';
    context?: string;
}

export interface RagUploadDto {
    file: File;
    description?: string;
    type: string;
}

export interface RagDocumentDto {
    id: string;
    filename: string;
    description?: string;
    uploadDate: string;
    size: number;
    type: string;
}

export interface GeneratedPortfolioDto {
    user: Partial<UserDto>;
    projects: ProjectDto[];
    skills: SkillDto[];
    workExperiences: WorkExperienceDto[];
    summary?: string;
    suggestions?: string[];
}

export interface RagResponseDto {
    response: string;
    sources?: string[];
    confidence?: number;
}
