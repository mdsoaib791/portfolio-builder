'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { BsFillSendFill } from 'react-icons/bs';
import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';
import Response from '@/dtos/response-dto';
import IUnitOfService from '@/services/interfaces/Iunit-of-service';
import { AxiosResponse } from 'axios';
import { toast } from '@/components/ui/use-toast';
import { useAddSkill, useGetSkillById, useUpdateSkill } from '@/hooks/services-hook/use-skill.service.hook';
import { SkillModel } from '@/models/skill-model';
import SkillSchema from '@/schema/skill-schema';
import { SkillDto } from '@/dtos/skill-dto';
import useGetCurrentUser from '@/hooks/use-get-current-user';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface ManageSkillProps {
    id: number;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const skillLevels = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Expert', label: 'Expert' },
];

export default function ManageSkill({ id, isOpen, onClose, onSuccess }: ManageSkillProps) {
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const currentUser = useGetCurrentUser();
    const getSkillById = useGetSkillById(id, id > 0 && isOpen);
    const addSkill = useAddSkill();
    const updateSkill = useUpdateSkill();
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    const form = useForm<SkillModel>({
        resolver: yupResolver(SkillSchema),
        defaultValues: {
            userId: currentUser?.userId || 'test-user-id', // Fallback for development
            name: '',
            level: '',
            description: '',
        },
    });

    const { setValue, handleSubmit, watch, reset, formState: { errors, isValid } } = form;

    // Debug: Watch form values
    const watchedValues = watch();

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log('Skill Form values:', watchedValues);
            console.log('Skill Form errors:', errors);
            console.log('Skill Form is valid:', isValid);
            console.log('Current user:', currentUser);
        }
    }, [watchedValues, errors, isValid, currentUser]);

    const fillSkillDetails = (skill: SkillDto) => {
        setValue('userId', skill.userId);
        setValue('name', skill.name);
        setValue('level', skill.level || '');
        setValue('description', skill.description || '');
    };

    useEffect(() => {
        if (getSkillById.status === 'success' && getSkillById.data?.data?.data) {
            setIsUpdating(true);
            fillSkillDetails(getSkillById.data.data.data);
        }
    }, [getSkillById.status, getSkillById.data?.data?.data]);

    useEffect(() => {
        if (currentUser?.userId && !isUpdating) {
            setValue('userId', currentUser.userId);
        }
    }, [currentUser?.userId, setValue, isUpdating]);

    useEffect(() => {
        if (id > 0 && isOpen) {
            getSkillById.refetch();
        }
    }, [id, isOpen]);

    // Reset form when dialog opens for adding new skill
    useEffect(() => {
        if (isOpen && id === 0) {
            reset({
                userId: currentUser?.userId || 'test-user-id',
                name: '',
                level: '',
                description: '',
            });
            setIsUpdating(false);
        }
    }, [isOpen, id, reset, currentUser?.userId]);

    const save = async (model: SkillModel) => {
        console.log('Skill form submission started with model:', model);

        // Validate userId
        if (!model.userId && currentUser?.userId) {
            model.userId = currentUser.userId;
        }

        // Fallback for development/testing
        if (!model.userId) {
            model.userId = 'test-user-id';
        }

        let response: AxiosResponse<Response<SkillDto>>;
        setShowLoader(true);

        try {
            console.log('isUpdating:', isUpdating);
            if (isUpdating) {
                console.log('Updating skill with ID:', id, 'Model:', model);
                response = await updateSkill.mutateAsync({ id: id, model: model });
            } else {
                console.log('Adding new skill with model:', model);
                response = await addSkill.mutateAsync(model);
            }

            console.log('Skill API Response:', response);

            if (response && (response.status === 200 || response.status === 201) && response.data.data) {
                setShowLoader(false);
                toast({
                    title: `Skill ${isUpdating ? 'updated' : 'added'} successfully`,
                });
                onSuccess();
                onClose();
            } else {
                setShowLoader(false);
                const error = unitOfService.ErrorHandlerService.getErrorMessage(response);
                console.error('Skill API Error Response:', response);
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: <span>{error}</span>,
                });
            }
        } catch (error) {
            setShowLoader(false);
            console.error('Skill form submission error:', error);

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
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isUpdating ? 'Edit Skill' : 'Add New Skill'}
                    </DialogTitle>
                    <DialogDescription>
                        {isUpdating ? 'Update your skill information below.' : 'Add a new skill to your portfolio. Fill in the details below.'}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form autoComplete="off" onSubmit={handleSubmit(save)} className="space-y-4">
                        <div className="grid grid-cols-12 gap-4">
                            {/* Skill Name */}
                            <div className="col-span-12 md:col-span-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Skill Name *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g. JavaScript, React, Python"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Skill Level */}
                            <div className="col-span-12 md:col-span-6">
                                <FormField
                                    control={form.control}
                                    name="level"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Skill Level</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value || ''}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select skill level" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {skillLevels.map((level) => (
                                                        <SelectItem key={level.value} value={level.value}>
                                                            {level.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Description */}
                            <div className="col-span-12">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe your experience and expertise with this skill..."
                                                    className="min-h-[100px]"
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
                                        {isUpdating ? 'Update Skill' : 'Add Skill'}
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
