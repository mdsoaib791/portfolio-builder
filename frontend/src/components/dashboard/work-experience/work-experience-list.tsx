'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Plus,
    Edit,
    Trash2,
    MapPin,
    Calendar,
    Building,
    Search,
    X,
    Filter
} from 'lucide-react';
import { WorkExperienceDto } from '@/dtos/work-experience-dto';
import { useGetAllWorkExperiences, useDeleteWorkExperience } from '@/hooks/services-hook/use-work-experience.service.hook';
import { WorkExperienceListParams } from '@/params/work-experience.params';
import { toast } from '@/components/ui/use-toast';
import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';
import IUnitOfService from '@/services/interfaces/Iunit-of-service';
import moment from 'moment';
import ManageWorkExperience from './add-update';

export default function WorkExperienceList() {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);
    const [workExperiences, setWorkExperiences] = useState<WorkExperienceDto[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedWorkExperienceId, setSelectedWorkExperienceId] = useState<number>(0);
    const [showFilters, setShowFilters] = useState(false);

    // Filter parameters state
    const [filterParams, setFilterParams] = useState<WorkExperienceListParams>({
        companyName: '',
        position: '',
        location: '',
        page: 1,
        recordPerPage: 10
    });

    const workExperienceResponse = useGetAllWorkExperiences(filterParams);

    const deleteWorkExperience = useDeleteWorkExperience();


    useEffect(() => {
        console.log(workExperienceResponse);
        if (workExperienceResponse.status === 'success' && workExperienceResponse.data.data.data) {

            setWorkExperiences(workExperienceResponse.data.data.data);
        }
    }, [workExperienceResponse.status, workExperienceResponse.data?.data?.data]);



    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this work experience?')) {
            try {
                const response = await deleteWorkExperience.mutateAsync(id);

                if (response && response.status === 200) {
                    toast({
                        title: 'Work experience deleted successfully',
                    });
                    // Refresh the list
                    workExperienceResponse.refetch();
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
                    description: <span>Failed to delete work experience</span>,
                });
            }
        }
    };

    const formatDate = (date: string | Date | null | undefined) => {
        if (!date) return 'Present';
        return moment(date).format('MMM YYYY');
    };

    const handleAddClick = () => {
        setSelectedWorkExperienceId(0);
        setShowAddModal(true);
    };

    const handleEditClick = (id: number) => {
        setSelectedWorkExperienceId(id);
        setShowEditModal(true);
    };

    const closeModals = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setSelectedWorkExperienceId(0);
        // Refresh the list when modal closes
        workExperienceResponse.refetch();
    };

    // Filter handlers
    const handleCompanyNameChange = (value: string) => {
        setFilterParams(prev => ({
            ...prev,
            companyName: value,
            page: 1 // Reset to first page when filtering
        }));
    };

    const handlePositionChange = (value: string) => {
        setFilterParams(prev => ({
            ...prev,
            position: value,
            page: 1
        }));
    };

    const handleLocationChange = (value: string) => {
        setFilterParams(prev => ({
            ...prev,
            location: value,
            page: 1
        }));
    };

    const resetFilters = () => {
        setFilterParams({
            companyName: '',
            position: '',
            location: '',
            page: 1,
            recordPerPage: 10
        });
    };

    const hasActiveFilters = filterParams.companyName || filterParams.position || filterParams.location;

    const handleSuccess = () => {
        // Refresh the list after successful add/update
        workExperienceResponse.refetch();
    };

    return (
        <div className="space-y-6">
            {/* Add/Edit Work Experience Dialog */}
            <ManageWorkExperience
                id={selectedWorkExperienceId}
                isOpen={showAddModal || showEditModal}
                onClose={closeModals}
                onSuccess={handleSuccess}
            />

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Work Experience</h1>
                    <p className="text-muted-foreground">Manage your work experience entries</p>
                </div>
                <Button onClick={handleAddClick}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Work Experience
                </Button>
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
                                    {[filterParams.companyName, filterParams.position, filterParams.location].filter(Boolean).length} active
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="companyFilter">Company Name</Label>
                                <Input
                                    id="companyFilter"
                                    placeholder="Search by company name..."
                                    value={filterParams.companyName || ''}
                                    onChange={(e) => handleCompanyNameChange(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="positionFilter">Position</Label>
                                <Input
                                    id="positionFilter"
                                    placeholder="Search by position..."
                                    value={filterParams.position || ''}
                                    onChange={(e) => handlePositionChange(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="locationFilter">Location</Label>
                                <Input
                                    id="locationFilter"
                                    placeholder="Search by location..."
                                    value={filterParams.location || ''}
                                    onChange={(e) => handleLocationChange(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                                {workExperienceResponse.isLoading ? 'Loading...' : `${workExperiences.length} experience(s) found`}
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
            {workExperienceResponse.isLoading && (
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

            {/* Work Experience List */}
            {!workExperienceResponse.isLoading && (
                <>
                    {workExperiences.length === 0 ? (
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center text-muted-foreground">
                                    <Building className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                    <h3 className="text-lg font-medium mb-2">
                                        {hasActiveFilters ? 'No work experience found' : 'No work experience added yet'}
                                    </h3>
                                    <p className="mb-4">
                                        {hasActiveFilters
                                            ? 'Try adjusting your search criteria or clear the filters.'
                                            : 'Start building your professional portfolio by adding your work experience.'
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
                                            Add Your First Work Experience
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {workExperiences.map((experience) => (
                                <Card key={experience.id} className="hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-2">
                                                <CardTitle className="text-xl">{experience.position}</CardTitle>
                                                <CardDescription className="flex items-center gap-2 text-base">
                                                    <Building className="h-4 w-4" />
                                                    {experience.companyName}
                                                </CardDescription>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEditClick(experience.id)}
                                                    title="Edit work experience"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(experience.id)}
                                                    disabled={deleteWorkExperience.isPending}
                                                    title="Delete work experience"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {/* Date and Location Info */}
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>
                                                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                                                    </span>
                                                </div>
                                                {experience.location && (
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{experience.location}</span>
                                                    </div>
                                                )}
                                                {!experience.endDate && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        Current Position
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Description */}
                                            {experience.description && (
                                                <div className="border-l-4 border-primary/20 pl-4">
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {experience.description}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
