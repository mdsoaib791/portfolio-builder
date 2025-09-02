import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';
import IUnitOfService from '@/services/interfaces/Iunit-of-service';
import { WorkExperienceListParams } from '@/params/work-experience.params';
import { WorkExperienceModel } from '@/models/work-experience-model';

const useGetAllWorkExperiences = (params: WorkExperienceListParams, enabled: boolean = true) => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    return useQuery({
        queryKey: ['WorkExperienceService.getAll', params],
        queryFn: async () => {
            return await unitOfService.WorkExperienceService.getAll(params);
        },
        enabled: enabled,
    });
};

const useGetWorkExperienceById = (id: number, enabled: boolean = true) => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    return useQuery({
        queryKey: ['WorkExperienceService.getById', id],
        queryFn: async () => {
            return await unitOfService.WorkExperienceService.getById(id);
        },
        enabled: enabled && id > 0,
    });
};

const useAddWorkExperience = () => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);
    const queryClient = useQueryClient();

    const mutationFn = async (model: WorkExperienceModel) => {
        return unitOfService.WorkExperienceService.add(model);
    };

    return useMutation({
        mutationFn,
        onSettled: (response) => {
            if (response && response.status === 201) {
                // Invalidate and refetch work experience queries
                queryClient.invalidateQueries({
                    queryKey: ['WorkExperienceService.getAll']
                });
            }
        },
        onError: (error) => {
            return error;
        },
    });
};

const useUpdateWorkExperience = () => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);
    const queryClient = useQueryClient();

    const mutationFn = async (args: { id: number; model: WorkExperienceModel }) => {
        return unitOfService.WorkExperienceService.update(args.id, args.model);
    };

    return useMutation({
        mutationFn,
        onSettled: (response) => {
            if (response && response.status === 200) {
                // Invalidate and refetch work experience queries
                queryClient.invalidateQueries({
                    queryKey: ['WorkExperienceService.getAll']
                });
                queryClient.invalidateQueries({
                    queryKey: ['WorkExperienceService.getById']
                });
            }
        },
        onError: (error) => {
            return error;
        },
    });
};

const useDeleteWorkExperience = () => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);
    const queryClient = useQueryClient();

    const mutationFn = async (id: number) => {
        return unitOfService.WorkExperienceService.delete(id);
    };

    return useMutation({
        mutationFn,
        onSettled: (response) => {
            if (response && response.status === 200) {
                // Invalidate and refetch work experience queries
                queryClient.invalidateQueries({
                    queryKey: ['WorkExperienceService.getAll']
                });
            }
        },
        onError: (error) => {
            return error;
        },
    });
};

export {
    useGetAllWorkExperiences,
    useGetWorkExperienceById,
    useAddWorkExperience,
    useUpdateWorkExperience,
    useDeleteWorkExperience,
};
