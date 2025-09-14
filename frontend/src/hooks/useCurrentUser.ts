"use client";

import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';
import { UserDto } from '@/dtos/user-dto';
import IUserService from '@/services/interfaces/iuser-service';
import { useEffect, useState } from 'react';

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<UserDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                setLoading(true);
                setError(null);

                // Check if we have a token
                const token = localStorage.getItem('at');


                if (!token) {
                    throw new Error("No authentication token found");
                }

                const userService = container.get<IUserService>(TYPES.IUserService);
                const response = await userService.checkUserStatus();

            

                if (response.data && response.data.success && response.data.data) {
                    setCurrentUser(response.data.data);
                } else {
                    console.error("Invalid response structure:", response.data);
                    setError(new Error("Invalid response from server"));
                }
            } catch (err) {
                console.error("Error fetching current user:", err);
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    return { currentUser, loading, error };
};
