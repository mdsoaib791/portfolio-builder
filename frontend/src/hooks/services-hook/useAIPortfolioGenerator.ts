import { useState } from 'react';
import { useRagService } from './useRagService';
import { GeneratedPortfolioDto } from '../../dtos/rag-dto';
import { GeneratedPortfolioModel } from '../../models/rag-model';

export interface UseAIPortfolioGeneratorProps {
    onSuccess?: (data: GeneratedPortfolioModel) => void;
    onError?: (error: string) => void;
}

export function useAIPortfolioGenerator({ onSuccess, onError }: UseAIPortfolioGeneratorProps = {}) {
    const ragService = useRagService();
    const [isLoading, setIsLoading] = useState(false);
    const [generatedData, setGeneratedData] = useState<GeneratedPortfolioModel | null>(null);
    const [error, setError] = useState<string | null>(null);

    const generateFromPrompt = async (prompt: string) => {
        if (!prompt.trim()) {
            const errorMsg = 'Please provide a description for your portfolio';
            setError(errorMsg);
            onError?.(errorMsg);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await ragService.generatePortfolioFromPrompt(prompt);

            console.log('RAG Service Response:', response); // Debug log

            // Check if response exists and has data
            if (!response || !response.data) {
                const errorMsg = 'No response received from server';
                setError(errorMsg);
                onError?.(errorMsg);
                return;
            }

            // Check if the response has the expected structure
            if (response.data.success) {
                console.log('Success response data:', response.data); // Debug log

                // Check if backend returns structured data or just a summary string
                if (typeof response.data.data === 'string') {
                    // Backend returned a summary string, create a portfolio from it
                    console.log('Backend returned summary string, creating portfolio structure');
                    const portfolioData = createPortfolioFromSummary(response.data.data, prompt);
                    setGeneratedData(portfolioData);
                    onSuccess?.(portfolioData);
                } else if (response.data.data && response.data.data.user) {
                    // Backend returned structured data
                    const portfolioData = mapDtoToModel(response.data.data);
                    setGeneratedData(portfolioData);
                    onSuccess?.(portfolioData);
                } else {
                    console.error('Expected structure: { data: { user: {...}, projects: [...], skills: [...], workExperiences: [...] } }');
                    console.error('Or a string summary in data field');
                    console.error('Actual response.data:', response.data);
                    const errorMsg = 'Invalid response structure from server';
                    setError(errorMsg);
                    onError?.(errorMsg);
                }
            } else {
                console.error('Backend returned error response:', response.data);
                const errorMsg = response.data.message || 'Failed to generate portfolio';
                setError(errorMsg);
                onError?.(errorMsg);
            }
        } catch (err) {
            console.error('RAG Service Error:', err); // Debug log
            let errorMsg = 'An unexpected error occurred';

            if (err instanceof Error) {
                errorMsg = err.message;
            } else if (typeof err === 'object' && err !== null) {
                // Handle axios error
                const axiosError = err as any;
                if (axiosError.response) {
                    errorMsg = axiosError.response.data?.message || `Server error: ${axiosError.response.status}`;
                } else if (axiosError.request) {
                    errorMsg = 'Network error: Unable to reach server';
                } else {
                    errorMsg = axiosError.message || 'Unknown error occurred';
                }
            }

            setError(errorMsg);
            onError?.(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const generateFromCV = async (file: File) => {
        if (!file) {
            const errorMsg = 'Please select a CV file to upload';
            setError(errorMsg);
            onError?.(errorMsg);
            return;
        }

        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
        if (!allowedTypes.includes(file.type)) {
            const errorMsg = 'Please upload a PDF, DOC, DOCX, or TXT file';
            setError(errorMsg);
            onError?.(errorMsg);
            return;
        }

        // Validate file size (5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            const errorMsg = 'File size must be less than 5MB';
            setError(errorMsg);
            onError?.(errorMsg);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await ragService.generatePortfolioFromCV(file);

            console.log('RAG Service CV Response:', response); // Debug log

            // Check if response exists and has data
            if (!response || !response.data) {
                const errorMsg = 'No response received from server';
                setError(errorMsg);
                onError?.(errorMsg);
                return;
            }

            // Check if the response has the expected structure
            if (response.data.success) {
                console.log('CV Success response data:', response.data); // Debug log

                // Check if backend returns structured data or just a summary string
                if (typeof response.data.data === 'string') {
                    // Backend returned a summary string, create a portfolio from it
                    console.log('Backend returned CV summary string, creating portfolio structure');
                    const portfolioData = createPortfolioFromSummary(response.data.data, file.name);
                    setGeneratedData(portfolioData);
                    onSuccess?.(portfolioData);
                } else if (response.data.data && response.data.data.user) {
                    // Backend returned structured data
                    const portfolioData = mapDtoToModel(response.data.data);
                    setGeneratedData(portfolioData);
                    onSuccess?.(portfolioData);
                } else {
                    console.error('Expected CV structure: { data: { user: {...}, projects: [...], skills: [...], workExperiences: [...] } }');
                    console.error('Or a string summary in data field');
                    console.error('Actual CV response.data:', response.data);
                    const errorMsg = 'Invalid CV response structure from server';
                    setError(errorMsg);
                    onError?.(errorMsg);
                }
            } else {
                console.error('Backend returned CV error response:', response.data);
                const errorMsg = response.data.message || 'Failed to process CV';
                setError(errorMsg);
                onError?.(errorMsg);
            }
        } catch (err) {
            console.error('RAG Service CV Error:', err); // Debug log
            let errorMsg = 'An unexpected error occurred';

            if (err instanceof Error) {
                errorMsg = err.message;
            } else if (typeof err === 'object' && err !== null) {
                // Handle axios error
                const axiosError = err as any;
                if (axiosError.response) {
                    errorMsg = axiosError.response.data?.message || `Server error: ${axiosError.response.status}`;
                } else if (axiosError.request) {
                    errorMsg = 'Network error: Unable to reach server';
                } else {
                    errorMsg = axiosError.message || 'Unknown error occurred';
                }
            }

            setError(errorMsg);
            onError?.(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const clearData = () => {
        setGeneratedData(null);
        setError(null);
    };

    const mapDtoToModel = (dto: GeneratedPortfolioDto): GeneratedPortfolioModel => {
        return {
            user: {
                firstName: dto.user?.fullName?.split(' ')[0] || 'Unknown',
                lastName: dto.user?.fullName?.split(' ').slice(1).join(' ') || 'User',
                email: dto.user?.email || '',
                phone: dto.user?.phoneNumber || undefined,
                bio: dto.user?.userType || undefined,
                linkedinUrl: '', // Not available in existing UserDto
                githubUrl: '', // Not available in existing UserDto
                websiteUrl: '', // Not available in existing UserDto
                location: dto.user?.timezoneId || undefined,
            },
            projects: dto.projects?.map(project => ({
                title: project.title || 'Untitled Project',
                description: project.description || '',
                technologies: project.technologies ? project.technologies.split(',').map(tech => tech.trim()) : [],
                startDate: project.startDate?.toString(),
                endDate: project.endDate?.toString(),
                projectUrl: project.url || '', // ProjectDto uses 'url' field
                githubUrl: '', // Not available in existing ProjectDto
            })) || [],
            skills: dto.skills?.map(skill => ({
                name: skill.name || 'Unknown Skill',
                level: (skill.level as 'beginner' | 'intermediate' | 'advanced' | 'expert') || 'intermediate',
                category: 'technical', // Not available in existing SkillDto, using default
            })) || [],
            workExperiences: dto.workExperiences?.map(exp => ({
                company: exp.companyName || '',
                position: exp.position || '',
                description: exp.description || '',
                startDate: exp.startDate?.toString() || '',
                endDate: exp.endDate?.toString(),
                location: exp.location || '',
            })) || [],
            summary: dto.summary || 'No summary available',
            suggestions: dto.suggestions || [],
        };
    };

    // Create portfolio structure from AI-generated summary string
    const createPortfolioFromSummary = (summary: string, originalPrompt: string): GeneratedPortfolioModel => {
        // Extract email from the summary
        const emailMatch = summary.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        const email = emailMatch ? emailMatch[0] : '';

        // Extract name patterns (look for common name indicators)
        const namePattern = /(?:I'm|My name is|I am)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i;
        const nameMatch = summary.match(namePattern);
        let firstName = 'Professional';
        let lastName = 'Developer';

        if (nameMatch) {
            const fullName = nameMatch[1].split(' ');
            firstName = fullName[0];
            lastName = fullName.slice(1).join(' ') || 'Developer';
        }

        // Extract technologies/skills from both prompt and summary
        const techKeywords = ['react', 'javascript', 'typescript', 'node.js', 'python', 'java', 'css', 'html', 'sql', 'mongodb', 'express', 'next.js', 'angular', 'vue', 'docker', 'aws', 'git', 'bootstrap'];
        const combinedText = (originalPrompt + ' ' + summary).toLowerCase();
        const detectedTechs = techKeywords.filter(tech => combinedText.includes(tech.toLowerCase()));

        // Extract experience level
        const experiencePattern = /(\d+)[\s-]*(?:years?|yrs?)/i;
        const expMatch = combinedText.match(experiencePattern);
        const years = expMatch ? parseInt(expMatch[1]) : 3;

        return {
            user: {
                firstName,
                lastName,
                email,
                bio: summary.replace(/\*\*/g, '').trim(), // Remove markdown formatting
            },
            skills: detectedTechs.length > 0 ? detectedTechs.map(tech => ({
                name: tech.charAt(0).toUpperCase() + tech.slice(1),
                level: years > 5 ? 'expert' : years > 3 ? 'advanced' : 'intermediate' as 'beginner' | 'intermediate' | 'advanced' | 'expert',
                category: 'technical'
            })) : [
                { name: 'Frontend Development', level: 'advanced' as const, category: 'technical' },
                { name: 'Backend Development', level: 'intermediate' as const, category: 'technical' },
                { name: 'Full Stack Development', level: 'intermediate' as const, category: 'technical' }
            ],
            projects: [
                {
                    title: 'Professional Portfolio Project',
                    description: 'Showcase of skills and experience based on AI-generated profile',
                    technologies: detectedTechs.length > 0 ? detectedTechs.slice(0, 3) : ['React', 'Node.js', 'TypeScript'],
                    startDate: '2023-01-01',
                    endDate: '2024-12-31'
                }
            ],
            workExperiences: [
                {
                    company: 'Professional Experience',
                    position: `${years > 5 ? 'Senior' : years > 3 ? 'Mid-level' : 'Junior'} Developer`,
                    description: 'Professional development experience as described in generated profile',
                    startDate: '2021-01-01',
                    endDate: '2024-12-31',
                    location: 'Professional Environment'
                }
            ],
            summary: summary.replace(/\*\*/g, '').trim(),
            suggestions: [
                'Add specific project details',
                'Include quantifiable achievements',
                'Add portfolio links',
                'Expand work experience details'
            ]
        };
    };

    return {
        generateFromPrompt,
        generateFromCV,
        clearData,
        isLoading,
        generatedData,
        error,
    };
}
