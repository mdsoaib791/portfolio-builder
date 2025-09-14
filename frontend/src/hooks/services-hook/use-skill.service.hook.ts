import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';
import { SkillModel } from '@/models/skill-model';
import { SkillListParams } from '@/params/skill.params';
import IUnitOfService from '@/services/interfaces/Iunit-of-service';

const useGetAllSkills = (params: SkillListParams, enabled: boolean = true) => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    return useQuery({
        queryKey: ['SkillService.getAll', params],
        queryFn: async () => {
            return await unitOfService.SkillService.getAll(params);
        },
        enabled: enabled,
    });
};

const useGetSkillById = (id: number, enabled: boolean = true) => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    return useQuery({
        queryKey: ['SkillService.getById', id],
        queryFn: async () => {
            return await unitOfService.SkillService.getById(id);
        },
        enabled: enabled,
    });
};
const useGetSkillByUserId = (userId: string, enabled: boolean = true) => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    return useQuery({
        queryKey: ['SkillService.getByUserId', userId],
        queryFn: async () => {
            return await unitOfService.SkillService.getByUserId(userId);
        },
        enabled: enabled,
    });
};

const useAddSkill = () => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);
    const queryClient = useQueryClient();

    const mutationFn = async (model: SkillModel) => {
        return unitOfService.SkillService.add(model);
    };

    return useMutation({
        mutationFn,
        onSettled: (response) => {
            if (response && response.status === 201) {
                // Invalidate and refetch skills queries
                queryClient.invalidateQueries({ queryKey: ['SkillService.getAll'] });
            }
        },
        onError: (error) => {
            return error;
        },
    });
};

const useUpdateSkill = () => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);
    const queryClient = useQueryClient();

    const mutationFn = async (args: { id: number; model: SkillModel }) => {
        return unitOfService.SkillService.update(args.id, args.model);
    };

    return useMutation({
        mutationFn,
        onSettled: (response) => {
            if (response && response.status === 200) {
                // Invalidate and refetch skills queries
                queryClient.invalidateQueries({ queryKey: ['SkillService.getAll'] });
                queryClient.invalidateQueries({ queryKey: ['SkillService.getById'] });
            }
        },
        onError: (error) => {
            return error;
        },
    });
};

const useDeleteSkill = () => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);
    const queryClient = useQueryClient();

    const mutationFn = async (id: number) => {
        return unitOfService.SkillService.delete(id);
    };

    return useMutation({
        mutationFn,
        onSettled: (response) => {
            if (response && response.status === 204) {
                // Invalidate and refetch skills queries
                queryClient.invalidateQueries({ queryKey: ['SkillService.getAll'] });
            }
        },
        onError: (error) => {
            return error;
        },
    });
};

export {
    useAddSkill, useDeleteSkill, useGetAllSkills,
    useGetSkillById,
    useGetSkillByUserId, useUpdateSkill
};

