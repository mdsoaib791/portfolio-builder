"use client";

import { useState, useEffect } from 'react';
import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';
import IUserService from '@/services/interfaces/iuser-service';
import { UserDto } from '@/dtos/user-dto';

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<UserDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                setLoading(true);
                const userService = container.get<IUserService>(TYPES.IUserService);
                const response = await userService.checkUserStatus();

                if (response.data && response.data.data) {
                    setCurrentUser(response.data.data);
                }
                setLoading(false);
            } catch (err) {
                setError(err as Error);
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    return { currentUser, loading, error };
};
