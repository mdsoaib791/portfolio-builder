import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';
import { ProjectModel } from '@/models/project-model';
import { ProjectListParams } from '@/params/project.params';
import IUnitOfService from '@/services/interfaces/Iunit-of-service';

const useGetAllProjects = (params: ProjectListParams, enabled: boolean = true) => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    return useQuery({
        queryKey: ['ProjectService.getAll', params],
        queryFn: async () => {
            return await unitOfService.ProjectService.getAll(params);
        },
        enabled: enabled,
    });
};

const useGetProjectById = (id: number, enabled: boolean = true) => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    return useQuery({
        queryKey: ['ProjectService.getById', id],
        queryFn: async () => {
            return await unitOfService.ProjectService.getById(id);
        },
        enabled: enabled,
    });
};

const useAddProject = () => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);
    const queryClient = useQueryClient();

    const mutationFn = async (model: ProjectModel) => {
        return unitOfService.ProjectService.add(model);
    };

    return useMutation({
        mutationFn,
        onSettled: (response) => {
            if (response && response.status === 201) {
                // Invalidate and refetch projects queries
                queryClient.invalidateQueries({ queryKey: ['ProjectService.getAll'] });
            }
        },
        onError: (error) => {
            return error;
        },
    });
};

const useUpdateProject = () => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);
    const queryClient = useQueryClient();

    const mutationFn = async (args: { id: number; model: ProjectModel }) => {
        return unitOfService.ProjectService.update(args.id, args.model);
    };

    return useMutation({
        mutationFn,
        onSettled: (response) => {
            if (response && response.status === 200) {
                // Invalidate and refetch projects queries
                queryClient.invalidateQueries({ queryKey: ['ProjectService.getAll'] });
                queryClient.invalidateQueries({ queryKey: ['ProjectService.getById'] });
            }
        },
        onError: (error) => {
            return error;
        },
    });
};

const useDeleteProject = () => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);
    const queryClient = useQueryClient();

    const mutationFn = async (id: number) => {
        return unitOfService.ProjectService.delete(id);
    };

    return useMutation({
        mutationFn,
        onSettled: (response) => {
            if (response && response.status === 204) {
                // Invalidate and refetch projects queries
                queryClient.invalidateQueries({ queryKey: ['ProjectService.getAll'] });
            }
        },
        onError: (error) => {
            return error;
        },
    });
};

export {
    useAddProject, useDeleteProject, useGetAllProjects,
    useGetProjectById, useUpdateProject
};

