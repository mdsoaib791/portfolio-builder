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
                setError(null);

                // Check if we have a token
                const token = localStorage.getItem('at');
                console.log("Token exists:", !!token);

                if (!token) {
                    throw new Error("No authentication token found");
                }

                const userService = container.get<IUserService>(TYPES.IUserService);
                const response = await userService.checkUserStatus();

                console.log("API Response:", response.data);

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
