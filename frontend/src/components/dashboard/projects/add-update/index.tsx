'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { BsFillSendFill } from 'react-icons/bs';
import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';
import Response from '@/dtos/response-dto';
import IUnitOfService from '@/services/interfaces/Iunit-of-service';
import { AxiosResponse } from 'axios';
import { toast } from '@/components/ui/use-toast';
import { useAddProject, useGetProjectById, useUpdateProject } from '@/hooks/services-hook/use-project.service.hook';
import { ProjectModel } from '@/models/project-model';
import ProjectSchema from '@/schema/project-schema';
import { ProjectDto } from '@/dtos/project-dto';
import useGetCurrentUser from '@/hooks/use-get-current-user';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface ManageProjectProps {
    id: number;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

// Form-specific interface to handle date strings
interface ProjectFormModel {
    userId: string;
    title: string;
    description?: string;
    url?: string;
    technologies?: string;
    startDate: string;
    endDate?: string;
}

export default function ManageProject({ id, isOpen, onClose, onSuccess }: ManageProjectProps) {
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isOngoing, setIsOngoing] = useState<boolean>(false);
    const currentUser = useGetCurrentUser();
    const getProjectById = useGetProjectById(id, id > 0 && isOpen);
    const addProject = useAddProject();
    const updateProject = useUpdateProject();
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    const form = useForm<ProjectFormModel>({
        resolver: yupResolver(ProjectSchema),
        defaultValues: {
            userId: currentUser?.userId || 'test-user-id', // Fallback for development
            title: '',
            description: '',
            url: '',
            technologies: '',
            startDate: '',
            endDate: '',
        },
    });

    const { setValue, handleSubmit, watch, reset, formState: { errors, isValid } } = form;

    const watchedValues = watch();

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log('Project Form values:', watchedValues);
            console.log('Project Form errors:', errors);
            console.log('Project Form is valid:', isValid);
            console.log('Current user:', currentUser);
        }
    }, [watchedValues, errors, isValid, currentUser]);

    const fillProjectDetails = (project: ProjectDto) => {
        setValue('userId', project.userId);
        setValue('title', project.title);
        setValue('description', project.description || '');
        setValue('url', project.url || '');
        setValue('technologies', project.technologies || '');

        // Convert ISO date string to YYYY-MM-DD format for date inputs
        setValue(
            'startDate',
            typeof project.startDate === 'string'
                ? project.startDate.split('T')[0] // Extract date part from ISO string
                : project.startDate instanceof Date
                    ? project.startDate.toISOString().split('T')[0]
                    : ''
        );
        setValue(
            'endDate',
            typeof project.endDate === 'string'
                ? project.endDate.split('T')[0] // Extract date part from ISO string
                : project.endDate instanceof Date
                    ? project.endDate.toISOString().split('T')[0]
                    : ''
        );

        // Set ongoing project checkbox state
        setIsOngoing(!project.endDate);
    };

    useEffect(() => {
        if (getProjectById.status === 'success' && getProjectById.data?.data?.data) {
            setIsUpdating(true);
            fillProjectDetails(getProjectById.data.data.data);
        }
    }, [getProjectById.status, getProjectById.data?.data?.data]);

    useEffect(() => {
        if (currentUser?.userId && !isUpdating) {
            setValue('userId', currentUser.userId);
        }
    }, [currentUser?.userId, setValue, isUpdating]);

    useEffect(() => {
        if (id > 0 && isOpen) {
            getProjectById.refetch();
        }
    }, [id, isOpen]);

    // Reset form when dialog opens for adding new project
    useEffect(() => {
        if (isOpen && id === 0) {
            reset({
                userId: currentUser?.userId || 'test-user-id',
                title: '',
                description: '',
                url: '',
                technologies: '',
                startDate: '',
                endDate: '',
            });
            setIsUpdating(false);
            setIsOngoing(false);
        }
    }, [isOpen, id, reset, currentUser?.userId]);

    const handleOngoingChange = (checked: boolean) => {
        setIsOngoing(checked);
        if (checked) {
            setValue('endDate', '');
        }
    };

    const save = async (formData: ProjectFormModel) => {
        console.log('Project form submission started with model:', formData);

        // Convert form data to API model with proper date formatting
        const model: ProjectModel = {
            ...formData,
            startDate: unitOfService.DateTimeService.convertDateToISOString(formData.startDate) || formData.startDate,
            endDate: isOngoing ? undefined : (unitOfService.DateTimeService.convertDateToISOString(formData.endDate) || formData.endDate),
        };

        // Validate userId
        if (!model.userId && currentUser?.userId) {
            model.userId = currentUser.userId;
        }

        // Fallback for development/testing
        if (!model.userId) {
            model.userId = 'test-user-id';
        }

        let response: AxiosResponse<Response<ProjectDto>>;
        setShowLoader(true);

        try {
            console.log('isUpdating:', isUpdating);
            if (isUpdating) {
                console.log('Updating project with ID:', id, 'Model:', model);
                response = await updateProject.mutateAsync({ id: id, model: model });
            } else {
                console.log('Adding new project with model:', model);
                response = await addProject.mutateAsync(model);
            }



            if (response && (response.status === 200 || response.status === 201)) {
                setShowLoader(false);
                toast({
                    title: `Project ${isUpdating ? 'updated' : 'added'} successfully`,
                });
                onSuccess();
                onClose();
            } else {
                setShowLoader(false);
                const error = unitOfService.ErrorHandlerService.getErrorMessage(response.data.errors);
                console.error('Project API Error Response:', response);
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: <span>{error}</span>,
                });
            }
        } catch (error) {
            setShowLoader(false);
            console.error('Project form submission error:', error);

            let errorMessage = 'An unexpected error occurred';

            // Handle different types of errors
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as any;
                if (axiosError.response?.data?.message) {
                    errorMessage = axiosError.response.data.message;
                } else if (axiosError.response?.data?.error) {
                    errorMessage = axiosError.response.data.error;
                } else if (axiosError.message) {
                    errorMessage = axiosError.message;
                }
            }

            toast({
                variant: 'destructive',
                title: 'Error',
                description: <span>{errorMessage}</span>,
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isUpdating ? 'Edit Project' : 'Add New Project'}
                    </DialogTitle>
                    <DialogDescription>
                        {isUpdating ? 'Update your project information below.' : 'Add a new project to your portfolio. Fill in the details below.'}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form autoComplete="off" onSubmit={handleSubmit(save)} className="space-y-4">
                        <div className="grid grid-cols-12 gap-4">
                            {/* Project Title */}
                            <div className="col-span-12 md:col-span-8">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Title *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g. E-commerce Platform"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Project URL */}
                            <div className="col-span-12 md:col-span-4">
                                <FormField
                                    control={form.control}
                                    name="url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project URL</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://project-demo.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Technologies */}
                            <div className="col-span-12">
                                <FormField
                                    control={form.control}
                                    name="technologies"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Technologies Used</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g. React, Node.js, MongoDB, Tailwind CSS"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Start Date */}
                            <div className="col-span-12 md:col-span-6">
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Start Date *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    {...field}
                                                    value={field.value || ''}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* End Date */}
                            <div className="col-span-12 md:col-span-6">
                                <FormField
                                    control={form.control}
                                    name="endDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>End Date</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    disabled={isOngoing}
                                                    {...field}
                                                    value={field.value || ''}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center space-x-2 mt-2">
                                    <Checkbox
                                        id="ongoing"
                                        checked={isOngoing}
                                        onCheckedChange={handleOngoingChange}
                                    />
                                    <label
                                        htmlFor="ongoing"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        This is an ongoing project
                                    </label>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="col-span-12">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe the project, its features, and your role in developing it..."
                                                    className="min-h-[120px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-2 pt-4 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={showLoader}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={showLoader || !isValid}
                                className="min-w-[120px]"
                            >
                                {showLoader ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {isUpdating ? 'Updating...' : 'Adding...'}
                                    </>
                                ) : (
                                    <>
                                        <BsFillSendFill className="mr-2 h-4 w-4" />
                                        {isUpdating ? 'Update Project' : 'Add Project'}
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
