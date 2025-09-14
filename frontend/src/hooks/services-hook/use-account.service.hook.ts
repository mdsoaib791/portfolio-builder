import { useMutation } from '@tanstack/react-query';

import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';
import IUnitOfService from '@/services/interfaces/Iunit-of-service';
import LoginModel from '@/models/login-model';
import CreateUserModel from '@/models/create-user-model';

const useLogin = () => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    const mutationFn = async (model: LoginModel) => {
        return unitOfService.AccountService.login(model);
    };

    return useMutation({
        mutationFn,
        onSettled: (response) => {
            if (response && response.status === 200) {
                //invalidate query or handle login success
            }
        },
        onError: (error) => {
            return error;
        },
    });
};

const useRegister = () => {
    const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);

    const mutationFn = async (model: CreateUserModel) => {
        return unitOfService.AccountService.register(model);
    };

    return useMutation({
        mutationFn,
        onSettled: (response) => {
            if (response && response.status === 201) {
                //invalidate query or handle register success
            }
        },
        onError: (error) => {
            return error;
        },
    });
};

export {
    useLogin,
    useRegister,
};
