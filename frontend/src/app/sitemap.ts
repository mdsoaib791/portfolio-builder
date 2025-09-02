import { MetadataRoute } from 'next';
import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';
import IUserService from '@/services/interfaces/iuser-service';
import { UserDto } from '@/dtos/user-dto';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Get the base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Default entries
    const routes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/dashboard`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
    ];

    try {
        // Get user service
        const userService = container.get<IUserService>(TYPES.IUserService);

        // Get all users
        const usersResponse = await userService.getAll({});
        const users = usersResponse?.data?.data || [];

        // Add portfolio URLs for each user
        if (Array.isArray(users)) {
            const userUrls = users.map((user: UserDto) => ({
                url: `${baseUrl}/portfolio/${user.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            }));

            return [...routes, ...userUrls];
        }

        return routes;
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return routes;
    }
}
