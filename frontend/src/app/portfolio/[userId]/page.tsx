import { Metadata, ResolvingMetadata } from 'next';

import PortfolioClient from './portfolio-client';

// Generate dynamic metadata for the portfolio page
export async function generateMetadata(
    { params }: { params: { userId: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const userId = params.userId;

    // Fetch user data based on userId to get dynamic title and description
    // Here we use mock data for demonstration; replace with actual data fetching logic
    const mockUserData = {
        name: "John Doe",
        bio: "Full Stack Developer specializing in React and Node.js"
    };

    return {
        title: `${mockUserData.name}'s Portfolio`,
        description: mockUserData.bio,
        openGraph: {
            title: `${mockUserData.name}'s Portfolio`,
            description: mockUserData.bio,
            url: `https://yourdomain.com/portfolio/${userId}`,
            siteName: 'Portfolio Builder',
            images: [
                {
                    url: 'https://yourdomain.com/og-image.jpg',
                    width: 800,
                    height: 600,
                    alt: 'Og Image Alt',
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${mockUserData.name}'s Portfolio`,
            description: mockUserData.bio,
            images: ['https://yourdomain.com/og-image.jpg'],
        },
    };
}

// Server component - Note that we're NOT using "use client" directive here
export default function Portfolio() {
    // The component must return JSX
    return <PortfolioClient />;
}
