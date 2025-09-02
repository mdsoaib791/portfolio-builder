import { useMutation, useQuery } from '@tanstack/react-query';

import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';
import IUnitOfService from '@/services/interfaces/Iunit-of-service';
import { UserListParams } from '@/params/user.params';
import { UserModel } from '@/models/user-model';

const useGetAllUsers = (params: UserListParams, enabled: boolean = true) => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    return useQuery({
        queryKey: ['UserService.getAll', params],
        queryFn: async () => {
            return await unitOfService.UserService.getAll(params);
        },
        enabled: enabled,
    });
};

const useGetUserByUserId = (userId: string, enabled: boolean = true) => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    return useQuery({
        queryKey: ['UserService.getById', userId],
        queryFn: async () => {
            return await unitOfService.UserService.getById(userId);
        },
        enabled: enabled,
    });
};

const useGetUserDetails = (userId: string, enabled: boolean = true) => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    return useQuery({
        queryKey: ['UserService.getUserDetails', userId],
        queryFn: async () => {
            return await unitOfService.UserService.getUserDetails(userId);
        },
        enabled: enabled,
    });
};

const useCheckUserStatus = (enabled: boolean = true) => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    return useQuery({
        queryKey: ['UserService.checkUserStatus'],
        queryFn: async () => {
            return await unitOfService.UserService.checkUserStatus();
        },
        enabled: enabled,
    });
};

const useAddUser = () => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    const mutationFn = async (model: UserModel) => {
        return unitOfService.UserService.add(model);
    };

    return useMutation({
        mutationFn,
        onSettled: (response) => {
            if (response && response.status === 201) {
                //invalidate query
            }
        },
        onError: (error) => {
            return error;
        },
    });
};

const useUpdateUser = () => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    const mutationFn = async (args: { id: number; model: UserModel }) => {
        return unitOfService.UserService.update(args.id, args.model);
    };

    return useMutation({
        mutationFn,
        onSettled: (response) => {
            if (response && response.status === 200) {
                //invalidate query
            }
        },
        onError: (error) => {
            return error;
        },
    });
};

const useDeleteUser = () => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    const mutationFn = async (id: number) => {
        return unitOfService.UserService.delete(id);
    };

    return useMutation({
        mutationFn,
        onSettled: (response) => {
            if (response && response.status === 200) {
                //invalidate query
            }
        },
        onError: (error) => {
            return error;
        },
    });
};

export {
    useGetAllUsers,
    useGetUserByUserId,
    useGetUserDetails,
    useCheckUserStatus,
    useAddUser,
    useUpdateUser,
    useDeleteUser,
};
