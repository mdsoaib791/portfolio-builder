"use client";

import { NextRequest, NextResponse } from 'next/server';
import { portfolioService } from '@/services/portfolio-service';

export async function GET(
    request: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        const userId = params.userId;

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        const portfolioData = await portfolioService.getUserPortfolioData(userId);

        if (!portfolioData.user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(portfolioData);
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch portfolio data' },
            { status: 500 }
        );
    }
}
