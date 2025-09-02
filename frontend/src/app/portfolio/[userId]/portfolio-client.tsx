"use client";

import HomePageWrapper from '@/components/portfolio';
import { ProjectDto } from '@/dtos/project-dto';
import { SkillDto } from '@/dtos/skill-dto';
import { WorkExperienceDto } from '@/dtos/work-experience-dto';
import { useGetAllProjects } from '@/hooks/services-hook/use-project.service.hook';
import { useGetAllSkills } from '@/hooks/services-hook/use-skill.service.hook';
import { useGetAllWorkExperiences } from '@/hooks/services-hook/use-work-experience.service.hook';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PortfolioClient() {
    const params = useParams();
    const userId = params.userId as string;

    const [skillData, setSkillData] = useState<SkillDto[]>([]);
    const [projectData, setProjectData] = useState<ProjectDto[]>([]);
    const [experienceData, setExperienceData] = useState<WorkExperienceDto[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const skillResponse = useGetAllSkills({ userId });
    const projectResponse = useGetAllProjects({ userId });
    const experienceResponse = useGetAllWorkExperiences({ userId });

    console.log("skillResponse", skillResponse)
    console.log("projectResponse", projectResponse)

    useEffect(() => {
        if (!userId) {
            setError("Invalid user ID.");
            setLoading(false);
            return;
        }

        if (skillResponse.isLoading || projectResponse.isLoading || experienceResponse.isLoading) {
            setLoading(true);
            return;
        }

        if (skillResponse.isError || projectResponse.isError || experienceResponse.isError) {
            setError("Failed to load portfolio data. Please try again later.");
            setLoading(false);
            return;
        }

        if (skillResponse.isSuccess) {
            const skills = skillResponse.data?.data.data;
            setSkillData(Array.isArray(skills) ? skills : []);
        }

        if (projectResponse.isSuccess) {
            const projects = projectResponse.data?.data.data;
            setProjectData(Array.isArray(projects) ? projects : []);
        }

        if (experienceResponse.isSuccess) {
            const experiences = experienceResponse.data?.data.data;
            setExperienceData(Array.isArray(experiences) ? experiences : []);
        }

        setLoading(false);
    }, [
        userId,
        skillResponse.isLoading,
        skillResponse.isError,
        skillResponse.isSuccess,
        skillResponse.data,
        projectResponse.isLoading,
        projectResponse.isError,
        projectResponse.isSuccess,
        projectResponse.data,
        experienceResponse.isLoading,
        experienceResponse.isError,
        experienceResponse.isSuccess,
        experienceResponse.data,
    ]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-lg">Loading portfolio...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md p-8 bg-red-50 rounded-lg">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Portfolio Not Found</h2>
                    <p className="text-gray-700">
                        {error || "We couldn't find the portfolio you're looking for. Please check the URL and try again."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <HomePageWrapper
            skill={skillData}
            experience={experienceData}
            project={projectData}
        />
    );
}
