import { ProjectDto } from "./project.dto";
import { SkillDto } from "./skill.dto";
import { UserDto } from "./user.dto";
import { WorkExperienceDto } from "./work-experience.dto";

export interface GeneratePortfolioModel {
  intent: 'GENERATE_PORTFOLIO';
  prompt: string;
}

export interface GeneratedPortfolioResponseDTO {
  profileDescription: string;
  user: UserDto;
  skills: SkillDto[];
  projects: ProjectDto[];
  workExperience: WorkExperienceDto[];
}



