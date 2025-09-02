'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
    Plus,
    Edit,
    Trash2,
    Code,
    Star,
    Search,
    X,
    Filter
} from 'lucide-react';
import { SkillDto } from '@/dtos/skill-dto';
import { toast } from '@/components/ui/use-toast';
import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';
import IUnitOfService from '@/services/interfaces/Iunit-of-service';
import { useGetAllSkills, useDeleteSkill } from '@/hooks/services-hook/use-skill.service.hook';
import { SkillListParams } from '@/params/skill.params';
import ManageSkill from './add-update';

export default function SkillsList() {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);
    const [skills, setSkills] = useState<SkillDto[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSkillId, setSelectedSkillId] = useState<number>(0);
    const [showFilters, setShowFilters] = useState(false);

    // Filter parameters state
    const [filterParams, setFilterParams] = useState<SkillListParams>({
        name: '',
        level: '',
        page: 1,
        recordPerPage: 10
    });

    const skillsResponse = useGetAllSkills(filterParams);
    const deleteSkill = useDeleteSkill();

    useEffect(() => {
        console.log('Skills response:', skillsResponse);
        if (skillsResponse.status === 'success' && Array.isArray(skillsResponse.data?.data?.data)) {
            setSkills(skillsResponse.data.data.data);
        }
    }, [skillsResponse.status, skillsResponse.data?.data?.data]);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this skill?')) {
            try {
                const response = await deleteSkill.mutateAsync(id);

                if (response && response.status === 200) {
                    toast({
                        title: 'Skill deleted successfully',
                    });
                    // Refresh the list
                    skillsResponse.refetch();
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
                    description: <span>Failed to delete skill</span>,
                });
            }
        }
    };

    const getLevelColor = (level: string | null | undefined) => {
        if (!level) return 'bg-gray-500/10 text-gray-700 border-gray-200';

        switch (level.toLowerCase()) {
            case 'expert':
                return 'bg-green-500/10 text-green-700 border-green-200';
            case 'advanced':
                return 'bg-blue-500/10 text-blue-700 border-blue-200';
            case 'intermediate':
                return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
            case 'beginner':
                return 'bg-orange-500/10 text-orange-700 border-orange-200';
            default:
                return 'bg-gray-500/10 text-gray-700 border-gray-200';
        }
    };

    const getLevelProgress = (level: string | null | undefined) => {
        if (!level) return 0;

        switch (level.toLowerCase()) {
            case 'expert': return 95;
            case 'advanced': return 75;
            case 'intermediate': return 55;
            case 'beginner': return 25;
            default: return 0;
        }
    };

    const handleAddClick = () => {
        setSelectedSkillId(0);
        setShowAddModal(true);
    };

    const handleEditClick = (id: number) => {
        setSelectedSkillId(id);
        setShowEditModal(true);
    };

    const closeModals = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setSelectedSkillId(0);
        // Refresh the list when modal closes
        skillsResponse.refetch();
    };

    const handleSuccess = () => {
        // Refresh the list after successful add/update
        skillsResponse.refetch();
    };

    // Filter handlers
    const handleNameChange = (value: string) => {
        setFilterParams(prev => ({
            ...prev,
            name: value,
            page: 1
        }));
    };

    const handleLevelChange = (value: string) => {
        setFilterParams(prev => ({
            ...prev,
            level: value,
            page: 1
        }));
    };

    const resetFilters = () => {
        setFilterParams({
            name: '',
            level: '',
            page: 1,
            recordPerPage: 10
        });
    };

    const hasActiveFilters = filterParams.name || filterParams.level;

    // Stats calculations
    const expertSkills = skills.filter(skill => skill.level?.toLowerCase() === 'expert').length;
    const advancedSkills = skills.filter(skill => skill.level?.toLowerCase() === 'advanced').length;
    const intermediateSkills = skills.filter(skill => skill.level?.toLowerCase() === 'intermediate').length;
    const beginnerSkills = skills.filter(skill => skill.level?.toLowerCase() === 'beginner').length;

    return (
        <div className="space-y-6">
            {/* Add/Edit Skill Dialog */}
            <ManageSkill
                id={selectedSkillId}
                isOpen={showAddModal || showEditModal}
                onClose={closeModals}
                onSuccess={handleSuccess}
            />

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Skills</h1>
                    <p className="text-muted-foreground">Manage your technical skills and expertise</p>
                </div>
                <Button onClick={handleAddClick}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Skill
                </Button>
            </div>

            {/* Skills Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                            <Code className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Total Skills</h3>
                        </div>
                        <div className="text-2xl font-bold">{skills.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-green-600" />
                            <h3 className="text-sm font-medium">Expert Level</h3>
                        </div>
                        <div className="text-2xl font-bold text-green-600">{expertSkills}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                            <div className="h-4 w-4 rounded-full bg-blue-500" />
                            <h3 className="text-sm font-medium">Advanced</h3>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{advancedSkills}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                            <div className="h-4 w-4 rounded-full bg-yellow-500" />
                            <h3 className="text-sm font-medium">Intermediate</h3>
                        </div>
                        <div className="text-2xl font-bold text-yellow-600">{intermediateSkills}</div>
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
                                    {[filterParams.name, filterParams.level].filter(Boolean).length} active
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
                                <Label htmlFor="nameFilter">Skill Name</Label>
                                <Input
                                    id="nameFilter"
                                    placeholder="Search by skill name..."
                                    value={filterParams.name || ''}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="levelFilter">Skill Level</Label>
                                <Input
                                    id="levelFilter"
                                    placeholder="Search by level..."
                                    value={filterParams.level || ''}
                                    onChange={(e) => handleLevelChange(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                                {skillsResponse.isLoading ? 'Loading...' : `${skills.length} skill(s) found`}
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
            {skillsResponse.isLoading && (
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

            {/* Skills List */}
            {!skillsResponse.isLoading && (
                <>
                    {skills.length === 0 ? (
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center text-muted-foreground">
                                    <Code className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                    <h3 className="text-lg font-medium mb-2">
                                        {hasActiveFilters ? 'No skills found' : 'No skills added yet'}
                                    </h3>
                                    <p className="mb-4">
                                        {hasActiveFilters
                                            ? 'Try adjusting your search criteria or clear the filters.'
                                            : 'Start building your skills portfolio by adding your technical skills.'
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
                                            Add Your First Skill
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {skills.map((skill) => (
                                <Card key={skill.id} className="hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-2">
                                                <CardTitle className="text-xl">{skill.name}</CardTitle>
                                                <CardDescription className="flex items-center gap-2">
                                                    {skill.level && (
                                                        <Badge className={getLevelColor(skill.level)}>
                                                            {skill.level}
                                                        </Badge>
                                                    )}
                                                </CardDescription>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEditClick(skill.id)}
                                                    title="Edit skill"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(skill.id)}
                                                    title="Delete skill"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {/* Progress Bar */}
                                            {skill.level && (
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>Proficiency Level</span>
                                                        <span className="font-medium">{skill.level}</span>
                                                    </div>
                                                    <Progress
                                                        value={getLevelProgress(skill.level)}
                                                        className="h-2"
                                                    />
                                                </div>
                                            )}

                                            {/* Description */}
                                            {skill.description && (
                                                <div className="border-l-4 border-primary/20 pl-4">
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {skill.description}
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
