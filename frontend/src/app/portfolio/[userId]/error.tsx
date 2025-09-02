"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md p-8 bg-red-50 rounded-lg">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
                <p className="text-gray-700 mb-6">
                    We couldn't load this portfolio. Please try again later.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
                    <Button onClick={reset} variant="outline">
                        Try again
                    </Button>
                    <Button asChild>
                        <Link href="/dashboard">
                            Return to Dashboard
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
