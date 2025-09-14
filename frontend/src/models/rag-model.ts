export interface RagQueryModel {
    prompt: string;
    type: 'query' | 'portfolio-generation' | 'cv-upload';
    context?: string;
}

export interface GeneratedPortfolioModel {
    user: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        bio?: string;
        linkedinUrl?: string;
        githubUrl?: string;
        websiteUrl?: string;
        location?: string;
        // Additional fields that might come from UserDto
        fullName?: string;
        profilePicture?: string;
        userType?: string;
    };
    projects: Array<{
        title: string;
        description: string;
        technologies: string[];
        startDate?: string;
        endDate?: string;
        projectUrl?: string;
        githubUrl?: string;
        // Additional fields from existing ProjectDto
        url?: string;
    }>;
    skills: Array<{
        name: string;
        level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
        category?: string;
        // Additional fields from existing SkillDto
        description?: string;
        logo?: string;
    }>;
    workExperiences: Array<{
        company: string;
        position: string;
        description: string;
        startDate: string;
        endDate?: string;
        location?: string;
        // Field name consistency with existing DTO
        companyName?: string;
    }>;
    summary?: string;
    suggestions?: string[];
}

export interface RagDocumentModel {
    id: string;
    filename: string;
    description?: string;
    uploadDate: Date;
    size: number;
    type: string;
}
