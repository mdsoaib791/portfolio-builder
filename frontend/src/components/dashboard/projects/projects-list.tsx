'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';
import { ProjectDto } from '@/dtos/project-dto';
import { useDeleteProject, useGetAllProjects } from '@/hooks/services-hook/use-project.service.hook';
import { ProjectListParams } from '@/params/project.params';
import IUnitOfService from '@/services/interfaces/Iunit-of-service';
import {
    Calendar,
    Edit,
    ExternalLink,
    Filter,
    FolderOpen,
    Plus,
    Trash2,
    X
} from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ManageProject from './add-update';

export default function ProjectsList() {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);
    const [projects, setProjects] = useState<ProjectDto[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<number>(0);
    const [showFilters, setShowFilters] = useState(false);

    // Filter parameters state
    const [filterParams, setFilterParams] = useState<ProjectListParams>({
        title: '',
        technologies: '',
        page: 1,
        recordPerPage: 10
    });

    const projectsResponse = useGetAllProjects(filterParams);
    const deleteProject = useDeleteProject();

    useEffect(() => {

        if (projectsResponse.status === 'success' && Array.isArray(projectsResponse.data?.data?.data)) {
            setProjects(projectsResponse.data.data.data);
        }
    }, [projectsResponse.status, projectsResponse.data?.data?.data]);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this project?')) {
            try {
                const response = await deleteProject.mutateAsync(id);

                if (response && response.status === 200) {
                    toast({
                        title: 'Project deleted successfully',
                    });
                    // Refresh the list
                    projectsResponse.refetch();
                } else {
                    const error = unitOfService.ErrorHandlerService.getErrorMessage(response);
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: <span>{error}</span>,
                    });
                }
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: <span>Failed to delete project</span>,
                });
            }
        }
    };

    const formatDate = (date: string | Date | null | undefined) => {
        if (!date) return '';
        return moment(date).format('MMM DD, YYYY');
    };

    const getProjectStatus = (endDate: string | Date | null | undefined) => {
        if (!endDate) return 'In Progress';
        return 'Completed';
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'bg-green-500/10 text-green-700 border-green-200';
            case 'in progress':
                return 'bg-blue-500/10 text-blue-700 border-blue-200';
            default:
                return 'bg-gray-500/10 text-gray-700 border-gray-200';
        }
    };

    const getTechnologiesArray = (technologies: string | null | undefined) => {
        if (!technologies) return [];
        return technologies.split(',').map(tech => tech.trim());
    };

    const handleAddClick = () => {
        setSelectedProjectId(0);
        setShowAddModal(true);
    };

    const handleEditClick = (id: number) => {
        setSelectedProjectId(id);
        setShowEditModal(true);
    };

    const closeModals = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setSelectedProjectId(0);
        // Refresh the list when modal closes
        projectsResponse.refetch();
    };

    const handleSuccess = () => {
        // Refresh the list after successful add/update
        projectsResponse.refetch();
    };

    // Filter handlers
    const handleTitleChange = (value: string) => {
        setFilterParams(prev => ({
            ...prev,
            title: value,
            page: 1
        }));
    };

    const handleTechnologiesChange = (value: string) => {
        setFilterParams(prev => ({
            ...prev,
            technologies: value,
            page: 1
        }));
    };

    const resetFilters = () => {
        setFilterParams({
            title: '',
            technologies: '',
            page: 1,
            recordPerPage: 10
        });
    };

    const hasActiveFilters = filterParams.title || filterParams.technologies;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Projects</h1>
                    <p className="text-muted-foreground">Manage your portfolio projects and showcase your work</p>
                </div>
                <Button onClick={handleAddClick}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                </Button>
            </div>

            {/* Projects Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                            <FolderOpen className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Total Projects</h3>
                        </div>
                        <div className="text-2xl font-bold">{projects.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                            <div className="h-4 w-4 rounded-full bg-green-500" />
                            <h3 className="text-sm font-medium">Completed</h3>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                            {projects.filter(p => p.endDate).length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                            <div className="h-4 w-4 rounded-full bg-blue-500" />
                            <h3 className="text-sm font-medium">In Progress</h3>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                            {projects.filter(p => !p.endDate).length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">With Live URL</h3>
                        </div>
                        <div className="text-2xl font-bold">
                            {projects.filter(p => p.url).length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filter Section */}
            <Card>
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            <CardTitle className="text-lg">Filter Options</CardTitle>
                            {hasActiveFilters && (
                                <Badge variant="secondary" className="text-xs">
                                    {[filterParams.title, filterParams.technologies].filter(Boolean).length} active
                                </Badge>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            {showFilters ? 'Hide' : 'Show'} Filters
                        </Button>
                    </div>
                </CardHeader>

                {showFilters && (
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="titleFilter">Project Title</Label>
                                <Input
                                    id="titleFilter"
                                    placeholder="Search by title..."
                                    value={filterParams.title || ''}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="technologyFilter">Technologies</Label>
                                <Input
                                    id="technologyFilter"
                                    placeholder="Search by technology..."
                                    value={filterParams.technologies || ''}
                                    onChange={(e) => handleTechnologiesChange(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                                {projectsResponse.isLoading ? 'Loading...' : `${projects.length} project(s) found`}
                            </div>
                            {hasActiveFilters && (
                                <Button variant="outline" size="sm" onClick={resetFilters}>
                                    <X className="h-4 w-4 mr-2" />
                                    Clear All Filters
                                </Button>
                            )}
                        </div>
                    </CardContent>
                )}
            </Card>

            {/* Loading State */}
            {projectsResponse.isLoading && (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader>
                                <div className="h-4 bg-muted rounded w-1/3"></div>
                                <div className="h-3 bg-muted rounded w-1/4"></div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="h-3 bg-muted rounded w-full"></div>
                                    <div className="h-3 bg-muted rounded w-3/4"></div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Projects List */}
            {!projectsResponse.isLoading && (
                <>
                    {projects.length === 0 ? (
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center text-muted-foreground">
                                    <FolderOpen className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                    <h3 className="text-lg font-medium mb-2">
                                        {hasActiveFilters ? 'No projects found' : 'No projects added yet'}
                                    </h3>
                                    <p className="mb-4">
                                        {hasActiveFilters
                                            ? 'Try adjusting your search criteria or clear the filters.'
                                            : 'Start building your portfolio by adding your projects.'
                                        }
                                    </p>
                                    {hasActiveFilters ? (
                                        <Button variant="outline" onClick={resetFilters}>
                                            <X className="mr-2 h-4 w-4" />
                                            Clear Filters
                                        </Button>
                                    ) : (
                                        <Button onClick={handleAddClick}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Your First Project
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {projects.map((project) => {
                                const techArray = getTechnologiesArray(project.technologies);
                                const status = getProjectStatus(project.endDate);

                                return (
                                    <Card key={project.id} className="hover:shadow-md transition-shadow">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-2">
                                                    <CardTitle className="text-xl">{project.title}</CardTitle>
                                                    <CardDescription className="flex items-center gap-2 text-base">
                                                        <Calendar className="h-4 w-4" />
                                                        {formatDate(project.startDate)} - {formatDate(project.endDate) || 'Present'}
                                                    </CardDescription>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEditClick(project.id)}
                                                        title="Edit project"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(project.id)}
                                                        title="Delete project"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {/* Status and Link */}
                                                <div className="flex flex-wrap items-center gap-4">
                                                    <Badge className={getStatusColor(status)}>
                                                        {status}
                                                    </Badge>
                                                    {project.url && (
                                                        <Link
                                                            href={project.url}
                                                            target="_blank"
                                                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                                        >
                                                            <ExternalLink className="h-4 w-4" />
                                                            View Project
                                                        </Link>
                                                    )}
                                                </div>

                                                {/* Description */}
                                                {project.description && (
                                                    <div className="border-l-4 border-primary/20 pl-4">
                                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                                            {project.description}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Technologies */}
                                                {techArray.length > 0 && (
                                                    <div className="space-y-2">
                                                        <p className="text-sm font-medium">Technologies:</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {techArray.map((tech, index) => (
                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                    {tech}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </>
            )}

            {/* Add/Edit Project Dialog */}
            <ManageProject
                id={selectedProjectId}
                isOpen={showAddModal || showEditModal}
                onClose={closeModals}
                onSuccess={handleSuccess}
            />
        </div>
    );
}
