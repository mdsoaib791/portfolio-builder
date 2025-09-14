'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    User,
    Briefcase,
    Code,
    Award,
    GraduationCap,
    Calendar,
    MapPin,
    ExternalLink,
    Edit3,
    Check,
    X,
    Download
} from 'lucide-react';

interface GeneratedData {
    personalInfo?: {
        name?: string;
        email?: string;
        phone?: string;
        location?: string;
        summary?: string;
        bio?: string;
    };
    skills?: {
        name: string;
        level: string;
        category: string;
        isVerified?: boolean;
    }[];
    projects?: {
        title: string;
        description: string;
        technologies: string[];
        startDate?: string;
        endDate?: string;
        status: string;
        achievements?: string[];
        url?: string;
        repositoryUrl?: string;
    }[];
    workExperience?: {
        company: string;
        position: string;
        startDate: string;
        endDate?: string;
        location?: string;
        description: string;
        achievements: string[];
        technologies?: string[];
    }[];
    education?: {
        institution: string;
        degree: string;
        field: string;
        startDate: string;
        endDate?: string;
        gpa?: string;
    }[];
    certifications?: {
        name: string;
        issuer: string;
        date: string;
        url?: string;
    }[];
    rawResponse?: string;
    sessionId?: string;
}

interface GeneratedDataPreviewProps {
    data: GeneratedData;
    onConfirm: () => void;
    onReject: () => void;
    onEdit?: (section: string, item: any, index?: number) => void;
    isConfirming?: boolean;
}

export default function GeneratedDataPreview({
    data,
    onConfirm,
    onReject,
    onEdit,
    isConfirming = false
}: GeneratedDataPreviewProps) {

    const renderPersonalInfo = () => {
        if (!data.personalInfo) return null;

        const { name, email, phone, location, summary, bio } = data.personalInfo;

        return (
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                        {onEdit && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEdit('personal', data.personalInfo)}
                                className="ml-auto"
                            >
                                <Edit3 className="h-4 w-4" />
                            </Button>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {name && <div><span className="font-medium">Name:</span> {name}</div>}
                    {email && <div><span className="font-medium">Email:</span> {email}</div>}
                    {phone && <div><span className="font-medium">Phone:</span> {phone}</div>}
                    {location && <div><span className="font-medium">Location:</span> {location}</div>}
                    {summary && (
                        <div>
                            <span className="font-medium">Summary:</span>
                            <p className="text-sm text-gray-600 mt-1">{summary}</p>
                        </div>
                    )}
                    {bio && (
                        <div>
                            <span className="font-medium">Bio:</span>
                            <p className="text-sm text-gray-600 mt-1">{bio}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    const renderSkills = () => {
        if (!data.skills || data.skills.length === 0) return null;

        return (
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        Skills ({data.skills.length})
                        {onEdit && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEdit('skills', data.skills)}
                                className="ml-auto"
                            >
                                <Edit3 className="h-4 w-4" />
                            </Button>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {data.skills.map((skill, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex-1">
                                    <div className="font-medium">{skill.name}</div>
                                    <div className="text-sm text-gray-500">{skill.category}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant={
                                        skill.level === 'Expert' ? 'default' :
                                            skill.level === 'Advanced' ? 'secondary' : 'outline'
                                    }>
                                        {skill.level}
                                    </Badge>
                                    {skill.isVerified && <Badge variant="outline" className="text-green-600">Verified</Badge>}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    };

    const renderProjects = () => {
        if (!data.projects || data.projects.length === 0) return null;

        return (
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Projects ({data.projects.length})
                        {onEdit && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEdit('projects', data.projects)}
                                className="ml-auto"
                            >
                                <Edit3 className="h-4 w-4" />
                            </Button>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {data.projects.map((project, index) => (
                        <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <h4 className="font-medium text-lg">{project.title}</h4>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                        <Badge variant="outline">{project.status}</Badge>
                                        {project.startDate && (
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {project.startDate} - {project.endDate || 'Present'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {project.url && (
                                        <Button variant="ghost" size="sm" asChild>
                                            <a href={project.url} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    )}
                                    {onEdit && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onEdit('project', project, index)}
                                        >
                                            <Edit3 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-3">{project.description}</p>

                            {project.technologies && project.technologies.length > 0 && (
                                <div className="mb-3">
                                    <div className="text-sm font-medium mb-2">Technologies:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, techIndex) => (
                                            <Badge key={techIndex} variant="secondary">{tech}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {project.achievements && project.achievements.length > 0 && (
                                <div>
                                    <div className="text-sm font-medium mb-2">Key Achievements:</div>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        {project.achievements.map((achievement, achIndex) => (
                                            <li key={achIndex} className="flex items-start gap-2">
                                                <span className="text-green-600 mt-1">•</span>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    };

    const renderWorkExperience = () => {
        if (!data.workExperience || data.workExperience.length === 0) return null;

        return (
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Work Experience ({data.workExperience.length})
                        {onEdit && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEdit('workExperience', data.workExperience)}
                                className="ml-auto"
                            >
                                <Edit3 className="h-4 w-4" />
                            </Button>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {data.workExperience.map((experience, index) => (
                        <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <h4 className="font-medium text-lg">{experience.position}</h4>
                                    <div className="text-purple-600 font-medium">{experience.company}</div>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {experience.startDate} - {experience.endDate || 'Present'}
                                        </div>
                                        {experience.location && (
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {experience.location}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {onEdit && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onEdit('experience', experience, index)}
                                    >
                                        <Edit3 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>

                            <p className="text-sm text-gray-600 mb-3">{experience.description}</p>

                            {experience.achievements && experience.achievements.length > 0 && (
                                <div className="mb-3">
                                    <div className="text-sm font-medium mb-2">Key Achievements:</div>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        {experience.achievements.map((achievement, achIndex) => (
                                            <li key={achIndex} className="flex items-start gap-2">
                                                <span className="text-green-600 mt-1">•</span>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {experience.technologies && experience.technologies.length > 0 && (
                                <div>
                                    <div className="text-sm font-medium mb-2">Technologies Used:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {experience.technologies.map((tech, techIndex) => (
                                            <Badge key={techIndex} variant="secondary">{tech}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    };

    const renderEducation = () => {
        if (!data.education || data.education.length === 0) return null;

        return (
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Education ({data.education.length})
                        {onEdit && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEdit('education', data.education)}
                                className="ml-auto"
                            >
                                <Edit3 className="h-4 w-4" />
                            </Button>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {data.education.map((edu, index) => (
                        <div key={index} className="border rounded-lg p-3">
                            <h4 className="font-medium">{edu.degree} in {edu.field}</h4>
                            <div className="text-purple-600">{edu.institution}</div>
                            <div className="text-sm text-gray-500 mt-1">
                                {edu.startDate} - {edu.endDate || 'Present'}
                                {edu.gpa && ` • GPA: ${edu.gpa}`}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    };

    const renderCertifications = () => {
        if (!data.certifications || data.certifications.length === 0) return null;

        return (
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Certifications ({data.certifications.length})
                        {onEdit && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEdit('certifications', data.certifications)}
                                className="ml-auto"
                            >
                                <Edit3 className="h-4 w-4" />
                            </Button>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {data.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                                <h4 className="font-medium">{cert.name}</h4>
                                <div className="text-sm text-gray-500">{cert.issuer} • {cert.date}</div>
                            </div>
                            {cert.url && (
                                <Button variant="ghost" size="sm" asChild>
                                    <a href={cert.url} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                </Button>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="space-y-6">
            {/* Action Buttons */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-green-800 mb-2">
                                Generated Portfolio Content Ready
                            </h3>
                            <p className="text-sm text-green-600">
                                Review the generated content below. You can edit individual sections or confirm to add everything to your portfolio.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={onReject}
                                disabled={isConfirming}
                                className="flex items-center gap-2"
                            >
                                <X className="h-4 w-4" />
                                Cancel
                            </Button>
                            <Button
                                onClick={onConfirm}
                                disabled={isConfirming}
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                            >
                                {isConfirming ? (
                                    <>Loading...</>
                                ) : (
                                    <>
                                        <Check className="h-4 w-4" />
                                        Confirm & Add to Portfolio
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Generated Content */}
            <div className="max-h-[600px] overflow-y-auto">
                <div className="space-y-6 pr-4">
                    {renderPersonalInfo()}
                    {renderSkills()}
                    {renderProjects()}
                    {renderWorkExperience()}
                    {renderEducation()}
                    {renderCertifications()}

                    {/* Raw Response (for debugging) */}
                    {data.rawResponse && (
                        <Card className="border-dashed">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-sm">
                                    <Download className="h-4 w-4" />
                                    Raw AI Response
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <pre className="text-xs bg-gray-100 p-3 rounded-lg overflow-auto max-h-40">
                                    {data.rawResponse}
                                </pre>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
